const tagService = require("../service/tagService");

// 获取所有标签
const getAllTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "获取所有标签失败" });
  }
};

// 获取指定标签
const getTagById = async (req, res) => {
  const id = req.params.id;
  try {
    const tag = await tagService.getTagById(id);
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: "未找到指定标签" });
    }
  } catch (error) {
    res.status(500).json({ error: "获取指定标签失败" });
  }
};

// 创建新标签
const createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const newTag = await tagService.createTag(name);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: "创建新标签失败" });
  }
};

// 更新标签
const updateTag = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const updatedTag = await tagService.updateTag(id, name);
    if (updatedTag) {
      res.json(updatedTag);
    } else {
      res.status(404).json({ error: "未找到指定标签" });
    }
  } catch (error) {
    res.status(500).json({ error: "更新标签失败" });
  }
};

// 删除标签
const deleteTag = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTag = await tagService.deleteTag(id);
    if (deletedTag) {
      res.json(deletedTag);
    } else {
      res.status(404).json({ error: "未找到指定标签" });
    }
  } catch (error) {
    res.status(500).json({ error: "删除标签失败" });
  }
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
