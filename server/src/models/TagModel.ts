import BaseModel from "./BaseModel";
import { ITag } from "../types/tag";

class Tag extends BaseModel<ITag> {
  constructor() {
    super("tags");
  }
}

module.exports = new Tag();
