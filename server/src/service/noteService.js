const NoteModel = require("../models/NoteModel");
const NoteTagModel = require("../models/NoteTagModel");
const TagModel = require("../models/TagModel");

class NoteService {
  async createNote(noteData) {
    const { tags, ...noteDataWithoutTags } = noteData;
    const note = await NoteModel.create(noteDataWithoutTags);
    let tagObjects = [];
    if (tags && tags.length > 0) {
      // 将标签名转换为标签对象（包含id）
      tagObjects = await Promise.all(
        tags.map((tagName) => TagModel.findOrCreateByName(tagName))
      );
      // 创建笔记和标签的关联
      await Promise.all(
        tagObjects.map((tag) => NoteTagModel.addTagToNote(note.id, tag.id))
      );
    }

    return { ...note, tags: tags };
  }

  async getNoteById(id) {
    const note = await NoteModel.findById(id);
    if (note) {
      const tags = await NoteTagModel.getTagsByNoteId(note.id);
      return { ...note, tags };
    }
    return null;
  }

  async getNotes(query = {}) {
    // 过滤掉值为空字符串的查询条件
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== "")
    );
    const notes = await NoteModel.find(filteredQuery);
    // 为每个笔记添加标签信息
    const notesWithTags = await Promise.all(
      notes.map(async (note) => {
        const tags = await NoteTagModel.getTagsByNoteId(note.id);
        return { ...note, tags };
      })
    );
    return notesWithTags;
  }

  async updateNote(id, noteData) {
    const { tags, ...noteDataWithoutTags } = noteData;
    const updatedNote = await NoteModel.update(id, noteDataWithoutTags);

    if (updatedNote) {
      let tagObjects = [];
      if (tags && tags.length > 0) {
        // 将标签名转换为标签对象（包含id）
        tagObjects = await Promise.all(
          tags.map((tagName) => TagModel.findOrCreateByName(tagName))
        );
        // 先删除原有标签关联，再创建新的关联
        await NoteTagModel.deleteNoteAllTags(id);
        await Promise.all(
          tagObjects.map((tag) => NoteTagModel.addTagToNote(id, tag.id))
        );
      } else if (tags) {
        // 如果tags是空数组，只需要删除原有标签关联
        await NoteTagModel.deleteNoteAllTags(id);
      }
      return { ...updatedNote, tags: tagObjects };
    }
    return null;
  }

  async deleteNote(id) {
    // 先删除笔记相关的所有标签关联
    await NoteTagModel.deleteNoteAllTags(id);
    // 再删除笔记本身
    return await NoteModel.delete(id);
  }
}

module.exports = new NoteService();
