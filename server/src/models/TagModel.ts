import BaseModel from "./BaseModel";
import { ITag } from "../types/tag";

class Tag extends BaseModel<ITag> {
  constructor() {
    super("tags");
  }

  async findOrCreateByName(name: string) {
    const existingTag = await this.find({ name });
    if (existingTag && existingTag.length > 0) {
      return existingTag[0];
    }
    return await this.create({ name });
  }
}

module.exports = new Tag();
