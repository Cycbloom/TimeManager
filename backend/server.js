// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// 使用中间件
app.use(cors()); // 允许跨域请求
app.use(bodyParser.json()); // 解析 JSON 格式的请求体

// 模拟数据库
let notes = [];

// 获取所有笔记
app.get("/api/notes", (req, res) => {
  res.json({
    count: notes.length, // 返回笔记的数量
    results: notes, // 返回笔记的数组
  });
});

app.post("/api/notes", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const newNote = { ...content, id: Date.now() };
  notes.push(newNote);
  res.status(201).json(newNote); // 返回新创建的笔记
});

// 删除笔记
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params; // 获取要删除的笔记的 ID
  notes = notes.filter((note) => note.id !== Number(id)); // 过滤掉指定 ID 的笔记
  res.status(204).send(); // 返回空响应
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
