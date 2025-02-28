const { query } = require("../utils");
const db = require("../db");

function getAllTags(req, res) {
  const sql = "SELECT * FROM tags";

  query(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ count: rows.length, results: rows });
  });
}

module.exports = { getAllTags };
