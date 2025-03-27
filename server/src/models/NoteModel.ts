import mongoose from "mongoose";
import { INote } from "../types/note";
import {
  QueryParams,
  CreateData,
  RemoveBrand,
  UpdateData,
} from "../types/model";
import noteSchema from "../schema/noteSchema";

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
  async create(note: CreateData<INote>) {
    const now = new Date();
    const newNote = new Note({
      ...note,
      created_at: now,
      updated_at: now,
    });
    const result = await newNote.save();
    return transformId(result);
  }

  async findById(id: string) {
    const doc = await Note.findById(id).exec();
    return transformId(doc);
  }

  async find(query: QueryParams = {}) {
    const docs = await Note.find(query).exec();
    return docs.map(transformId);
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
    return transformId(doc);
  }

  async delete(id: string) {
    return await Note.deleteOne({ _id: id });
  }
}

module.exports = new NoteModel();
export default new NoteModel();
