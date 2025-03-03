const db = require("../db");

const notebookController = {
  getAllNotebooks: (req, res) => {
    db.all("SELECT * FROM notebooks ORDER BY updated_at DESC", (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      const results = rows;
      res.json({ count: results.length, results });
    });
  },

  getNotebookById: (req, res) => {
    const { id } = req.params;
    db.get(
      `SELECT *, 
        (SELECT COUNT(*) FROM notes WHERE notebook_id = ?) AS note_count 
       FROM notebooks WHERE id = ?`,
      [id, id],
      (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        row ? res.json(row) : res.sendStatus(404);
      }
    );
  },

  createNotebook: (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    db.run("INSERT INTO notebooks (name) VALUES (?)", [name], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
  },

  updateNotebook: (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    db.run(
      "UPDATE notebooks SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        this.changes > 0 ? res.sendStatus(204) : res.sendStatus(404);
      }
    );
  },

  deleteNotebook: (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM notebooks WHERE id = ?", [id], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      this.changes > 0 ? res.sendStatus(204) : res.sendStatus(404);
    });
  },
};

module.exports = notebookController;
