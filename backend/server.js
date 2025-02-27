const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const noteController = require("./controllers/noteController");

const app = express();

// 使用中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.get("/api/notes", noteController.getAllNotes);
app.get("/api/notes/:id", noteController.getNoteById);
app.post("/api/notes", noteController.createNote);
app.put("/api/notes/:id", noteController.updateNote);
app.delete("/api/notes/:id", noteController.deleteNote);

// 启动服务器
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
