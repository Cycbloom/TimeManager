import { RemoveBrand } from "../types/model";

export enum NoteType {
  article = "article",
  problem = "problem",
  solution = "solution",
  reference = "reference",
}
export interface INote {
  title: string;
  content: string;
  type: NoteType;
  created_at: { _brand: "timestamp"; value: Date };
  updated_at: { _brand: "timestamp"; value: Date };
}
export type IBaseNote = RemoveBrand<INote>;
