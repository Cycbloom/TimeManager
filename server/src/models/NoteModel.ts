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

class NoteModel {
  async create(note: CreateData<INote>) {
    const now = new Date();
    const newNote = new Note({
      ...note,
      created_at: now,
      updated_at: now,
    });
    const result = await newNote.save();
    return result;
  }

  async findById(id: string) {
    return await Note.findById(id).exec();
  }

  async find(query: QueryParams = {}) {
    return await Note.find(query).exec();
  }

  async update(id: string, note: UpdateData<INote>) {
    const now = new Date();
    return await Note.updateOne(
      { _id: id },
      {
        $set: {
          ...note,
          updated_at: now,
        },
      }
    );
  }

  async delete(id: string) {
    return await Note.deleteOne({ _id: id });
  }
}

module.exports = new NoteModel();
