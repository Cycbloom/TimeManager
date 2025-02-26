const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// 数据库文件路径
const dbPath = path.join(__dirname, "notes.db");

// 创建数据库连接
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// 初始化数据库表
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err);
      } else {
        console.log("Table 'notes' is ready.");
      }
    }
  );
});

module.exports = db;
