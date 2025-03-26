const NoteModel = require("../models/NoteModel");

class NoteService {
  async createNote(noteData) {
    return await NoteModel.create(noteData);
  }

  async getNoteById(id) {
    return await NoteModel.findById(id);
  }

  async getNotes(query = {}) {
    return await NoteModel.find(query);
  }

  async updateNote(id, noteData) {
    return await NoteModel.update(id, noteData);
  }

  async deleteNote(id) {
    return await NoteModel.delete(id);
  }
}

module.exports = new NoteService();
