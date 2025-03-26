import { RemoveBrand } from "./model";

export interface INote {
  title: string;
  content: string;
  tags: number[];
  created_at: { _brand: "timestamp"; value: Date };
  updated_at: { _brand: "timestamp"; value: Date };
}

export type IBaseNote = RemoveBrand<INote>;
