import BaseModel from "./BaseModel";
import { INotebook } from "../types/notebook";

class Notebook extends BaseModel<INotebook> {
  constructor() {
    super("notebooks");
  }
}

module.exports = new Notebook();
