import mongoose from "mongoose";
import { INote } from "../types/note";
import { RemoveBrand } from "../types/model";
import noteSchema from "../schema/noteSchema";
import MongoBaseModel from "./MongoBaseModel";

const Note = mongoose.model<RemoveBrand<INote>>("notes", noteSchema);

class NoteModel extends MongoBaseModel<INote> {
  constructor() {
    super(Note);
  }
}

module.exports = new NoteModel();
export default new NoteModel();
