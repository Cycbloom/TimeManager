import { CreateData, UpdateData } from "./model";

export interface INotebook {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface NotebookCreateData extends CreateData {
  name: string;
}

export interface NotebookUpdateData extends UpdateData {
  name: string;
}
