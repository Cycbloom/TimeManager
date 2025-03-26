const TagModel = require("../models/TagModel");

// 获取所有标签
const getAllTags = async (query = {}) => {
  return await TagModel.find(query);
};

// 获取指定标签
const getTagById = async (id) => {
  return await TagModel.find({ id }).then((rows) => rows[0]);
};

// 创建新标签
const createTag = async (name) => {
  return await TagModel.create({ name });
};

// 更新标签
const updateTag = async (id, name) => {
  return await TagModel.update(id, { name });
};

// 删除标签
const deleteTag = async (id) => {
  return await TagModel.delete(id);
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
