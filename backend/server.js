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
  db.all("SELECT * FROM notes", (err, rows) => {
    if (err) {
      console.error("Error fetching notes:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({
      count: rows.length,
      results: rows,
    });
  });
});

// 创建笔记
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const sql = `INSERT INTO notes (title, content) VALUES (?, ?)`;
  const params = [title || "Untitled", content];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error creating note:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const newNote = { id: this.lastID, title, content };
    res.status(201).json(newNote);
  });
});

// 更新笔记
app.put("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const sql = `UPDATE notes SET title = ?, content = ? WHERE id = ?`;
  const params = [title || "Untitled", content, id];

  db.run(sql, params, function (err) {
    if (err) {
      console.error("Error updating note:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json({ id: Number(id), title, content });
  });
});
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

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
