const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 获取所有笔记
app.get("/api/notes", (req, res) => {
  const sql = `
    SELECT notes.*, 
           GROUP_CONCAT(DISTINCT tags.name) AS tags,
           GROUP_CONCAT(DISTINCT categories.path) AS categories
    FROM notes
    LEFT JOIN note_tags ON notes.id = note_tags.note_id
    LEFT JOIN tags ON note_tags.tag_id = tags.id
    LEFT JOIN note_categories ON notes.id = note_categories.note_id
    LEFT JOIN categories ON note_categories.category_id = categories.id
    GROUP BY notes.id
  `;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching notes:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // 格式化结果
    const results = rows.map((row) => ({
      ...row,
      tags: row.tags ? row.tags.split(",") : [],
      categories: row.categories ? row.categories.split(",") : [],
    }));

    res.json({
      count: results.length,
      results,
    });
  });
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT notes.*, 
           GROUP_CONCAT(DISTINCT tags.name) AS tags,
           GROUP_CONCAT(DISTINCT categories.path) AS categories
    FROM notes
    LEFT JOIN note_tags ON notes.id = note_tags.note_id
    LEFT JOIN tags ON note_tags.tag_id = tags.id
    LEFT JOIN note_categories ON notes.id = note_categories.note_id
    LEFT JOIN categories ON note_categories.category_id = categories.id
    WHERE notes.id = ?
    GROUP BY notes.id
  `;

  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error("Error fetching note:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!row) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 格式化结果
    const result = {
      ...row,
      tags: row.tags ? row.tags.split(",") : [],
      categories: row.categories ? row.categories.split(",") : [],
    };

    res.json(result);
  });
});

// 创建笔记
app.post("/api/notes", (req, res) => {
  const {
    title,
    content,
    type = "article",
    tags = [],
    categories = [],
  } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const sql = `
    INSERT INTO notes (title, content, type, created_at, updated_at)
    VALUES (?, ?, ?, datetime('now'), datetime('now'))
  `;
  const params = [title || "Untitled", content, type];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error creating note:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const noteId = this.lastID;

    // 处理标签
    if (tags.length > 0) {
      const tagQuery = `
        INSERT INTO tags (name) VALUES (?)
        ON CONFLICT(name) DO NOTHING
        RETURNING id
      `;
      const tagNoteQuery = `INSERT INTO note_tags (note_id, tag_id) VALUES (?, ?)`;

      tags.forEach((tag) => {
        db.get(tagQuery, [tag], (err, row) => {
          if (err) return console.error("Error processing tag:", err);
          db.run(tagNoteQuery, [noteId, row.id], (err) => {
            if (err)
              return console.error(
                "Error inserting note-tag association:",
                err
              );
          });
        });
      });
    }

    // 处理分类
    if (categories.length > 0) {
      const categoryQuery = `
        SELECT id FROM categories WHERE path IN (${categories
          .map(() => "?")
          .join(",")})
      `;
      const insertCategoryQuery = `INSERT INTO note_categories (note_id, category_id) VALUES (?, ?)`;

      db.all(categoryQuery, categories, (err, rows) => {
        if (err) return console.error("Error processing categories:", err);
        rows.forEach((row) => {
          db.run(insertCategoryQuery, [noteId, row.id]);
        });
      });
    }

    // 返回新笔记
    res
      .status(201)
      .json({ id: noteId, title, content, type, tags, categories });
  });
});

// 更新笔记
app.put("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, type, tags, categories } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const sql = `
    UPDATE notes 
    SET title = ?, content = ?, type = ?, updated_at = datetime('now')
    WHERE id = ?
  `;
  const params = [title || "Untitled", content, type, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error updating note:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    // 更新标签
    updateTagsForNote(id, tags, (err) => {
      if (err) {
        return res.status(500).json({ error: "Error updating tags" });
      }
      res.status(200).json({ id: Number(id), title, content, type, tags });
    });
  });
});

// 辅助函数：更新笔记的标签
function updateTagsForNote(noteId, tags, callback) {
  db.serialize(() => {
    // 1. 删除旧的标签关联
    db.run(`DELETE FROM note_tags WHERE note_id = ?`, [noteId], (err) => {
      if (err) return callback(err);

      // 2. 插入新的标签关联
      if (tags && tags.length > 0) {
        const insertTagSql = `
          INSERT OR IGNORE INTO tags (name) VALUES (?)
        `;
        const insertNoteTagSql = `
          INSERT OR IGNORE INTO note_tags (note_id, tag_id)
          VALUES (?, (SELECT id FROM tags WHERE name = ?))
        `;

        tags.forEach((tag) => {
          // 插入标签（如果不存在）
          db.run(insertTagSql, [tag], (err) => {
            if (err) return callback(err);

            // 插入笔记和标签的关联
            db.run(insertNoteTagSql, [noteId, tag], (err) => {
              if (err) return callback(err);
            });
          });
        });
      }

      callback(null); // 成功
    });
  });
}

// 删除笔记
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM notes WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Error deleting note:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(204).send();
  });
});

// 获取所有分类
app.get("/api/categories", (req, res) => {
  const sql = `SELECT * FROM categories`;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// 获取所有标签
app.get("/api/tags", (req, res) => {
  const sql = `SELECT * FROM tags`;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching tags:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(rows);
  });
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
