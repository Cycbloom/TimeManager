import BaseModel from "./BaseModel";
import { NotebookCreateData, NotebookUpdateData } from "../types/notebook";

class Notebook extends BaseModel {
  constructor() {
    super("notebooks");
  }

  async create(data: NotebookCreateData) {
    return super.create(data);
  }

  async update(id: number, data: NotebookUpdateData) {
    return super.update(id, data);
  }
}

module.exports = new Notebook();
