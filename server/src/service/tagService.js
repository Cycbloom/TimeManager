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
// 根据标签名数组获取标签ID数组
const getTagIdsByNames = async (tags) => {
  if (!tags || tags.length === 0) return [];

  const tagObjects = await Promise.all(
    tags.map((tagName) => TagModel.findOrCreateByName(tagName))
  );
  return tagObjects.map((tag) => tag.id);
};

// 处理笔记的标签
const handleNoteTags = async (noteId, tags) => {
  if (tags && tags.length > 0) {
    // 获取标签ID
    const tagIds = await getTagIdsByNames(tags);
    // 先删除原有标签关联，再创建新的关联
    await NoteTagModel.deleteNoteAllTags(noteId);
    await Promise.all(
      tagIds.map((tagId) => NoteTagModel.addTagToNote(noteId, tagId))
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

// 根据标签数组获取笔记ID
const getNoteIdsByTags = async (tags) => {
  // 获取标签ID
  const tagIds = await getTagIdsByNames(tags);
  // 使用NoteTagModel的getNoteIdsByTagIds方法获取笔记ID
  return await NoteTagModel.getNoteIdsByTagIds(tagIds);
};

module.exports = {
  getAllTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  handleNoteTags,
  getTagIdsByNames,
  getNoteTagsByNoteId,
  getNoteIdsByTags,
};
