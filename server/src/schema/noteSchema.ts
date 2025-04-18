import { Schema } from "mongoose";
import { RemoveBrand } from "../types/model";
import { INote } from "../types/note";

const noteSchema = new Schema<RemoveBrand<INote>>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: String,
    enum: ["article", "problem", "solution", "reference"],
    required: true,
  },
  notebook_id: { type: Number, required: false },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

noteSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

export default noteSchema;
