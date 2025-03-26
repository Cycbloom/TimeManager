const noteService = require("../service/noteService");

class NoteController {
  async createNote(req, res) {
    try {
      const noteData = req.body;
      const result = await noteService.createNote(noteData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getNoteById(req, res) {
    try {
      const { id } = req.params;
      const note = await noteService.getNoteById(id);
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getNotes(req, res) {
    try {
      const notes = await noteService.getNotes(req.query);
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateNote(req, res) {
    try {
      const { id } = req.params;
      const noteData = req.body;
      const result = await noteService.updateNote(id, noteData);
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteNote(req, res) {
    try {
      const { id } = req.params;
      const result = await noteService.deleteNote(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Note not found" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new NoteController();
