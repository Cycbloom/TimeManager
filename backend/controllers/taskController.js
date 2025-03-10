// controllers/noteController.js
const { query } = require("../utils");
const db = require("../db");

// 获取所有任务
function getAllTasks(req, res) {
  const { status, priority } = req.query;
  const sql = `
  SELECT tasks.*,
    GROUP_CONCAT(DISTINCT tags.name) AS tags
    FROM tasks
    LEFT JOIN task_tags ON tasks.id = task_tags.task_id
    LEFT JOIN tags ON task_tags.tag_id = tags.id
    WHERE ${status ? `tasks.status = '${status}'` : "1"}
        AND ${priority ? `tasks.priority = '${priority}'` : "1"}
    GROUP BY tasks.id`;

  query(sql, [], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ count: results.length, results });
  });
}

// 根据 ID 获取单个任务
function getTaskById(req, res) {
  const { id } = req.params;
  const sql = `
  SELECT tasks.*,
    GROUP_CONCAT(DISTINCT tags.name) AS tags
    FROM tasks
    LEFT JOIN task_tags ON tasks.id = task_tags.task_id
    LEFT JOIN tags ON task_tags.tag_id = tags.id
    WHERE tasks.id = ?
    GROUP BY tasks.id`;

  query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(results[0]);
  });
}

// 创建任务
function createTask(req, res) {
  const { title, description, priority, estimatedHours, tag = [] } = req.body;
  if (!title || !description || !priority || !estimatedHours) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
  INSERT INTO tasks (
    title, 
    description, 
    priority, 
    estimated_hours,
    due_date,
    status
  ) VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [
      title,
      description,
      priority,
      estimatedHours,
      new Date(req.body.dueDate), // 转换日期格式
      req.body.status || "created",
    ],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const taskId = this.lastID;
      updateTagsForTask(taskId, tag, (err) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({
          id: taskId,
          title,
          description,
          priority,
          estimatedHours,
          dueDate: req.body.dueDate,
          status: req.body.status || "created",
          tags: tag,
        });
      });
    }
  );
}

function updateTagsForTask(taskId, tags, callback) {
  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    // 1. 删除旧的标签关联
    db.run(`DELETE FROM task_tags WHERE task_id = ?`, [taskId], (err) => {
      if (err) {
        db.run("ROLLBACK");
        return callback(err);
      }

      // 2. 插入新的标签关联
      if (tags && tags.length > 0) {
        const insertTagSql = `INSERT OR IGNORE INTO tags (name) VALUES (?)`;
        const insertNoteTagSql = `
          INSERT INTO task_tags (task_id, tag_id) 
          VALUES (?, (SELECT id FROM tags WHERE name = ?))
        `;

        tags.forEach((tag, index) => {
          db.run(insertTagSql, [tag], (err) => {
            if (err) {
              db.run("ROLLBACK");
              return callback(err);
            }
            db.run(insertNoteTagSql, [taskId, tag], (err) => {
              if (err) {
                db.run("ROLLBACK");
                return callback(err);
              }
              if (index === tags.length - 1) {
                db.run("COMMIT", callback);
              }
            });
          });
        });
      } else {
        db.run("COMMIT", callback);
      }
    });
  });
}

// 更新任务
function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, priority, estimatedHours, tag = [] } = req.body;
  if (!title || !description || !priority || !estimatedHours) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
  UPDATE tasks
  SET title = ?, description = ?, priority = ?, estimatedHours = ?
  WHERE id = ?`;

  db.run(
    sql,
    [title, description, priority, estimatedHours, id],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      updateTagsForTask(id, tag, (err) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(204).send();
      });
    }
  );
}

// 删除任务
function deleteTask(req, res) {
  const { id } = req.params;
  const sql = "DELETE FROM tasks WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).send();
  });
}

// 核心业务逻辑

// 实现动态优先级算法
const calculatePriority = (task) => {
  const daysLeft = (new Date(task.due_date) - Date.now()) / (1000 * 3600 * 24);
  const timePressure = task.estimated_hours / daysLeft;
  return timePressure > 2 ? "high" : timePressure > 1 ? "medium" : "low";
};

// 更新任务状态（含状态机验证）
async function updateTaskStatus(req, res) {
  const { taskId } = req.params;
  const { newStatus } = req.body;

  // 状态流转规则验证
  const validTransitions = {
    created: ["ready"],
    ready: ["executing"],
    executing: ["completed", "ready"],
    completed: [],
  };
  try {
    // 获取当前状态
    const current = await new Promise((resolve, reject) => {
      db.get("SELECT status FROM tasks WHERE id = ?", [taskId], (err, row) => {
        if (err) reject(err);
        else resolve(row?.status);
      });
    });
    if (!current) return res.status(404).json({ error: "Task not found" });
    if (!validTransitions[current].includes(newStatus)) {
      return res.status(400).json({
        error: `Invalid status transition: ${current} → ${newStatus}`,
      });
    }
    await new Promise((resolve, reject) => {
      db.run(
        "UPDATE tasks SET status = ?, updated_at = datetime('now') WHERE id = ?",
        [newStatus, taskId],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function recalculatePriority(req, res) {
  const { taskId } = req.params;

  try {
    const task = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM tasks WHERE id = ?", [taskId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const newPriority = calculatePriority(task);
    await new Promise((resolve, reject) => {
      db.run(
        "UPDATE tasks SET priority = ?, updated_at = datetime('now') WHERE id = ?",
        [newPriority, taskId],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
    res.json({ ...task, priority: newPriority });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  recalculatePriority,
};
