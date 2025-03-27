import { RemoveBrand } from "./model";

export interface INote {
  //TODO:
  id?: { _brand: "note_id"; value: number };
  title: string;
  content: string;
  created_at: { _brand: "timestamp"; value: Date };
  updated_at: { _brand: "timestamp"; value: Date };
}

export type IBaseNote = RemoveBrand<INote>;
