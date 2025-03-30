const NoteModel = require("../models/NoteModel");
const tagService = require("./tagService");

class NoteService {
  async createNote(noteData) {
    const { tags, ...noteDataWithoutTags } = noteData;
    const note = await NoteModel.create(noteDataWithoutTags);
    const noteTags = await tagService.handleNoteTags(note.id, tags);
    return { ...note, tags: noteTags };
  }

  async getNoteById(id) {
    const note = await NoteModel.findById(id);
    if (note) {
      const tags = await tagService.getNoteTagsByNoteId(note.id);
      return { ...note, tags };
    }
    return null;
  }

  async getNotes(query = {}) {
    const { orderBy, page = 1, limit = 10, tags, ...otherQuery } = query;

    // 过滤掉值为空字符串的查询条件
    const filteredQuery = Object.fromEntries(
      Object.entries(otherQuery).filter(([_, value]) => value !== "")
    );

    // 如果有标签过滤，先获取符合条件的笔记ID
    if (tags && tags.length > 0) {
      const noteIds = await tagService.getNoteIdsByTags(tags);
      if (noteIds.length === 0) return [];
      filteredQuery.id = { $in: noteIds };
    }

    // 构建查询参数
    const queryParams = {
      ...filteredQuery,
      page,
      limit,
    };

    // 添加排序参数
    if (orderBy) {
      const [field, order] = orderBy.split(" ");
      queryParams.orderBy = `${field}:${order}`;
    }

    // 执行查询
    const notes = await NoteModel.find(queryParams);

    // 为每个笔记添加标签信息
    const notesWithTags = await Promise.all(
      notes.map(async (note) => {
        const tags = await tagService.getNoteTagsByNoteId(note.id);
        return { ...note, tags };
      })
    );

    return notesWithTags;
  }

  async updateNote(id, noteData) {
    const { tags, ...noteDataWithoutTags } = noteData;
    const updatedNote = await NoteModel.update(id, noteDataWithoutTags);

    if (updatedNote) {
      const noteTags = await tagService.handleNoteTags(id, tags);
      return { ...updatedNote, tags: noteTags };
    }
    return null;
  }

  async deleteNote(id) {
    // 先删除笔记相关的所有标签关联
    await tagService.handleNoteTags(id, []);
    // 再删除笔记本身
    return await NoteModel.delete(id);
  }
}

module.exports = new NoteService();
