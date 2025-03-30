import mongoose from "mongoose";
import { INote } from "../types/note";
import {
  QueryParams,
  CreateData,
  RemoveBrand,
  UpdateData,
} from "../types/model";
import noteSchema from "../schema/noteSchema";
import logger from "../utils/logger";

const Note = mongoose.model<RemoveBrand<INote>>("notes", noteSchema);

// 转换_id为id的辅助函数
const transformId = (doc: any) => {
  if (!doc) return null;
  const transformed = doc.toJSON();
  transformed.id = transformed._id.toString();
  delete transformed._id;
  return transformed;
};

class NoteModel {
  protected processRow(row: any) {
    const processedRow = { ...row };
    if ("__v" in processedRow) {
      delete processedRow.__v;
    }
    return processedRow;
  }

  async create(note: CreateData<INote>) {
    const now = new Date();
    const newNote = new Note({
      ...note,
      created_at: now,
      updated_at: now,
    });
    const result = await newNote.save();
    return this.processRow(transformId(result));
  }

  async findById(id: string) {
    const doc = await Note.findById(id).exec();
    return this.processRow(transformId(doc));
  }

  async find(query: QueryParams = {}) {
    const { orderBy, page, limit, ...otherQuery } = query;
    // 处理查询条件中的id转换为_id
    const processedQuery = { ...otherQuery };
    if ("id" in processedQuery) {
      processedQuery._id = processedQuery.id;
      delete processedQuery.id;
    }
    let mongoQuery = Note.find(processedQuery);

    // 处理排序
    if (orderBy) {
      const [field, direction] = orderBy.split(":");
      mongoQuery = mongoQuery.sort({
        [field]: direction?.toLowerCase() === "desc" ? -1 : 1,
      });
    }

    // 处理分页
    if (page && limit) {
      const skip = (page - 1) * limit;
      mongoQuery = mongoQuery.skip(skip).limit(limit);
    }

    const docs = await mongoQuery.exec();
    return docs.map((doc) => this.processRow(transformId(doc)));
  }

  async update(id: string, note: UpdateData<INote>) {
    const now = new Date();
    const doc = await Note.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...note,
          updated_at: now,
        },
      },
      { new: true }
    );
    return this.processRow(transformId(doc));
  }

  async delete(id: string) {
    return await Note.deleteOne({ _id: id });
  }
}

module.exports = new NoteModel();
export default new NoteModel();
