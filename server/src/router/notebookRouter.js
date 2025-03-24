const express = require('express');
const router = express.Router();
const notebookController = require('../controller/notebookController');

// 获取所有笔记本
router.get('/api/notebooks', notebookController.getAllNotebooks);

// 获取指定笔记本
router.get('/api/notebooks/:id', notebookController.getNotebookById);

// 创建新笔记本
router.post('/api/notebooks', notebookController.createNotebook);

// 更新笔记本
router.put('/api/notebooks/:id', notebookController.updateNotebook);

// 删除笔记本
router.delete('/api/notebooks/:id', notebookController.deleteNotebook);

// 重命名笔记本
router.patch('/api/notebooks/:id/rename', notebookController.renameNotebook);

module.exports = router;