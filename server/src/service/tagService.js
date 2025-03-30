const TagModel = require("../models/TagModel");
const NoteTagModel = require("../models/NoteTagModel");

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

// 处理笔记的标签
const handleNoteTags = async (noteId, tags) => {
  let tagObjects = [];
  if (tags && tags.length > 0) {
    // 将标签名转换为标签对象（包含id）
    tagObjects = await Promise.all(
      tags.map((tagName) => TagModel.findOrCreateByName(tagName))
    );
    // 先删除原有标签关联，再创建新的关联
    await NoteTagModel.deleteNoteAllTags(noteId);
    await Promise.all(
      tagObjects.map((tag) => NoteTagModel.addTagToNote(noteId, tag.id))
    );
  } else if (tags) {
    // 如果tags是空数组，只需要删除原有标签关联
    await NoteTagModel.deleteNoteAllTags(noteId);
  }
  return tags;
};

// 获取笔记的标签
const getNoteTagsByNoteId = async (noteId) => {
  return await NoteTagModel.getTagsByNoteId(noteId);
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  handleNoteTags,
  getNoteTagsByNoteId,
};
