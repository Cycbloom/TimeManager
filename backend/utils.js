// 工具函数模块
const db = require("./db");

// 执行 SQL 查询并处理错误
function query(sql, params, callback) {
  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Database error:", err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
}

// 格式化笔记的 tags 和 categories 字段
function formatNote(note) {
  return {
    ...note,
    tags: note.tags ? note.tags.split(",") : [],
    categories: note.categories ? note.categories.split(",") : [],
  };
}

module.exports = { query, formatNote };
