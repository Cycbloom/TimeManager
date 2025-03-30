import BaseModel from "./BaseModel";
import { INoteTag } from "../types/note_tag";
import pool from "../config/postgres";
import NoteModel from "./NoteModel";
const logger = require("../utils/logger");

class NoteTag extends BaseModel<INoteTag> {
  constructor() {
    super("note_tags");
  }

  // 为笔记添加标签
  async addTagToNote(noteId: string, tagId: number) {
    return await this.create({
      note_id: noteId,
      tag_id: tagId,
    });
  }

  // 从笔记中移除标签
  async removeTagFromNote(noteId: string, tagId: number) {
    const result = await pool.query(
      `DELETE FROM ${this.tableName} WHERE note_id = $1 AND tag_id = $2 RETURNING *`,
      [noteId, tagId]
    );
    return result.rows[0];
  }

  // 获取笔记的所有标签
  async getTagsByNoteId(noteId: string) {
    const result = await pool.query(
      `SELECT t.name FROM tags t 
       JOIN note_tags nt ON t.id = nt.tag_id 
       WHERE nt.note_id = $1`,
      [noteId]
    );
    const tags = result.rows.map((row) => row.name);
    logger.info(JSON.stringify(tags));
    return tags;
  }

  // 获取使用了特定标签的所有笔记
  async getNotesByTagId(tagId: number) {
    // 首先从note_tags表获取note_id列表
    const noteTagsResult = await pool.query(
      `SELECT note_id FROM ${this.tableName} WHERE tag_id = $1`,
      [tagId]
    );

    // 如果没有找到任何笔记，返回空数组
    if (noteTagsResult.rows.length === 0) {
      return [];
    }

    // 获取所有笔记的id
    const noteIds = noteTagsResult.rows.map((row) => row.note_id);

    // 使用NoteModel获取笔记详情
    const notes = await Promise.all(
      noteIds.map((id) => NoteModel.findById(id))
    );

    // 过滤掉可能的null值（比如笔记已被删除的情况）
    return notes.filter((note) => note !== null);
  }

  // 根据标签ID数组获取笔记ID列表
  async getNoteIdsByTagIds(tagIds: number[]) {
    const result = await pool.query(
      `SELECT DISTINCT note_id FROM ${this.tableName} WHERE tag_id = ANY($1)`,
      [tagIds]
    );
    return result.rows.map((row) => row.note_id);
  }

  // 删除笔记的所有标签关联
  async deleteNoteAllTags(noteId: string) {
    const result = await pool.query(
      `DELETE FROM ${this.tableName} WHERE note_id = $1 RETURNING *`,
      [noteId]
    );
    return result.rows;
  }
}

module.exports = new NoteTag();
