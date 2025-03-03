const { query, formatNote } = require("../utils");
const db = require("../db");

// 获取所有笔记
// 获取所有笔记（支持过滤）
function getAllNotes(req, res) {
  const { queryType, queryTags } = req.query;
  let sql = `
    SELECT notes.*, 
           GROUP_CONCAT(DISTINCT tags.name) AS tags
    FROM notes
    LEFT JOIN note_tags ON notes.id = note_tags.note_id
    LEFT JOIN tags ON note_tags.tag_id = tags.id
  `;

  const params = [];

  // 添加 WHERE 条件
  const conditions = [];
  if (queryType) {
    conditions.push("notes.type = ?");
    params.push(queryType);
  }

  if (queryTags && queryTags.length > 0) {
    const tagPlaceholders = queryTags.map(() => "?").join(",");
    conditions.push(`tags.id IN (${tagPlaceholders})`);
    params.push(...queryTags);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += " GROUP BY notes.id"; // 确保分组在最后

  query(sql, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const results = rows.map((row) => formatNote(row));
    res.json({ count: results.length, results });
  });
}

// 根据 ID 获取单篇笔记
function getNoteById(req, res) {
  const { id } = req.params;
  const sql = `
    SELECT notes.*, 
           GROUP_CONCAT(DISTINCT tags.name) AS tags
    FROM notes
    LEFT JOIN note_tags ON notes.id = note_tags.note_id
    LEFT JOIN tags ON note_tags.tag_id = tags.id
    WHERE notes.id = ?
    GROUP BY notes.id
  `;

  query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (!rows.length) return res.status(404).json({ error: "Note not found" });
    res.json(formatNote(rows[0]));
  });
}

// 创建笔记
function createNote(req, res) {
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
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    const noteId = this.lastID;
    updateTagsForNote(noteId, tags, () => {
      res.status(201).json({ id: noteId, title, content, type, tags });
    });
  });
}

// 更新笔记
function updateNote(req, res) {
  const { id } = req.params;
  const { title, content, type, tags } = req.body;

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
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (this.changes === 0)
      return res.status(404).json({ error: "Note not found" });
    updateTagsForNote(id, tags, (err) => {
      if (err) {
        console.error("Error updating tags:", err);
        return res.status(500).json({ error: "Error updating tags" });
      }
      res.status(200).json({ id: Number(id), title, content, type, tags });
    });
  });
}

// 删除笔记
function deleteNote(req, res) {
  const { id } = req.params;
  db.run("PRAGMA foreign_keys = ON;", (err) => {
    if (err) console.error("Error enabling foreign key support:", err);
  });

  const sql = `DELETE FROM notes WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    if (this.changes === 0)
      return res.status(404).json({ error: "Note not found" });
    res.status(204).send();
  });
}

function updateTagsForNote(noteId, tags, callback) {
  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    // 1. 删除旧的标签关联
    db.run(`DELETE FROM note_tags WHERE note_id = ?`, [noteId], (err) => {
      if (err) {
        db.run("ROLLBACK");
        return callback(err);
      }

      // 2. 插入新的标签关联
      if (tags && tags.length > 0) {
        const insertTagSql = `INSERT OR IGNORE INTO tags (name) VALUES (?)`;
        const insertNoteTagSql = `
          INSERT INTO note_tags (note_id, tag_id) 
          VALUES (?, (SELECT id FROM tags WHERE name = ?))
        `;

        tags.forEach((tag, index) => {
          db.run(insertTagSql, [tag], (err) => {
            if (err) {
              db.run("ROLLBACK");
              return callback(err);
            }
            db.run(insertNoteTagSql, [noteId, tag], (err) => {
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

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
