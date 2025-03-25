const BaseModel = require("./baseModel");

class Notebook extends BaseModel {
  constructor() {
    super("notebooks");
  }

  async create(name) {
    return super.create({ name });
  }

  async update(id, name) {
    return super.update(id, { name });
  }
}

module.exports = new Notebook();
