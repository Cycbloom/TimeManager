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
  db.run("PRAGMA foreign_keys = ON"); // 开启外键约束
  // 创建 notebooks 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS notebooks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
    (err) => {
      if (err) console.error("Error creating 'notebooks' table:", err);
      else console.log("Table 'notebooks' is ready.");
    }
  );
  // 创建 notes 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        type TEXT CHECK(type IN ('article', 'problem', 'solution', 'reference')),
        notebook_id INTEGER DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (notebook_id) REFERENCES notebooks(id) ON DELETE SET NULL
      )
    `,
    (err) => {
      if (err) console.error("Error creating 'notes' table:", err);
      else console.log("Table 'notes' is ready.");
    }
  );

  // 创建 tags 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
      )
    `,
    (err) => {
      if (err) console.error("Error creating 'tags' table:", err);
      else console.log("Table 'tags' is ready.");
    }
  );

  // 创建 note_tags 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS note_tags (
        note_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (note_id, tag_id),
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
      )
    `,
    (err) => {
      if (err) console.error("Error creating 'note_tags' table:", err);
      else console.log("Table 'note_tags' is ready.");
    }
  );
});

module.exports = db;
