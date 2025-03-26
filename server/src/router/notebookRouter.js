const express = require("express");
const router = express.Router();
const notebookController = require("../controller/notebookController");

// 获取所有笔记本
router.get("/", notebookController.getAllNotebooks);

// 获取指定笔记本
router.get("/:id", notebookController.getNotebookById);

// 创建新笔记本
router.post("/", notebookController.createNotebook);

// 更新笔记本
router.put("/:id", notebookController.updateNotebook);

// 删除笔记本
router.delete("/:id", notebookController.deleteNotebook);

// 重命名笔记本
router.patch("/:id/rename", notebookController.renameNotebook);

module.exports = router;
