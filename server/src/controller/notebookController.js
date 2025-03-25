const notebookService = require("../service/notebookService");

// 获取所有笔记本
const getAllNotebooks = async (req, res) => {
  try {
    const notebooks = await notebookService.getAllNotebooks();
    res.json(notebooks);
  } catch (error) {
    res.status(500).json({ error: "获取所有笔记本失败" });
  }
};

// 获取指定笔记本
const getNotebookById = async (req, res) => {
  const id = req.params.id;
  try {
    const notebook = await notebookService.getNotebookById(id);
    if (notebook) {
      res.json(notebook);
    } else {
      res.status(404).json({ error: "未找到指定笔记本" });
    }
  } catch (error) {
    res.status(500).json({ error: "获取指定笔记本失败" });
  }
};

// 创建新笔记本
const createNotebook = async (req, res) => {
  const { name } = req.body;
  try {
    const newNotebook = await notebookService.createNotebook(name);
    res.status(201).json(newNotebook);
  } catch (error) {
    res.status(500).json({ error: "创建新笔记本失败" });
  }
};

// 更新笔记本
const updateNotebook = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const updatedNotebook = await notebookService.updateNotebook(id, name);
    if (updatedNotebook) {
      res.json(updatedNotebook);
    } else {
      res.status(404).json({ error: "未找到指定笔记本" });
    }
  } catch (error) {
    res.status(500).json({ error: "更新笔记本失败" });
  }
};

// 删除笔记本
const deleteNotebook = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNotebook = await notebookService.deleteNotebook(id);
    if (deletedNotebook) {
      res.json(deletedNotebook);
    } else {
      res.status(404).json({ error: "未找到指定笔记本" });
    }
  } catch (error) {
    res.status(500).json({ error: "删除笔记本失败" });
  }
};

// 重命名笔记本
const renameNotebook = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const renamedNotebook = await notebookService.renameNotebook(id, name);
    if (renamedNotebook) {
      res.json(renamedNotebook);
    } else {
      res.status(404).json({ error: "未找到指定笔记本" });
    }
  } catch (error) {
    res.status(500).json({ error: "重命名笔记本失败" });
  }
};

module.exports = {
  getAllNotebooks,
  getNotebookById,
  createNotebook,
  updateNotebook,
  deleteNotebook,
  renameNotebook,
};
