const { query } = require("../utils");
const db = require("../db");

function getAllTags(req, res) {
  const getAllTagsSql = "SELECT * FROM tags";

  // 删除未被使用的标签
  const deleteUnusedTagsSql =
    "DELETE FROM tags WHERE id NOT IN (SELECT DISTINCT tag_id FROM note_tags)";

  // 先执行删除操作
  query(deleteUnusedTagsSql, [], (err, result) => {
    if (err) {
      console.error("Error deleting unused tags:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    // 删除操作完成后，查询剩余的标签
    query(getAllTagsSql, [], (err, tags) => {
      if (err) {
        console.error("Error fetching tags:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // 返回剩余的标签
      res.json({ count: tags.length, results: tags });
    });
  });
}

module.exports = { getAllTags };
