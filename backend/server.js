const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, "data.json");

// 读取数据
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    return [];
  }
}

// 写入数据
function writeData(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing data:", error);
  }
}

// 获取所有笔记
app.get("/api/notes", (req, res) => {
  const notes = readData();
  res.json({
    count: notes.length,
    results: notes,
  });
});

// 创建笔记
app.post("/api/notes", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Note content is required" });
  }

  const notes = readData();
  const newNote = { ...content, id: Date.now() };
  notes.push(newNote);
  writeData(notes);
  res.status(201).json(newNote);
});

// 删除笔记
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  let notes = readData();
  notes = notes.filter((note) => note.id !== Number(id));
  writeData(notes);
  res.status(204).send();
});

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
