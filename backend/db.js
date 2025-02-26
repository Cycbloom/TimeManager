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
  // 创建 notes 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        type TEXT CHECK(type IN ('article', 'problem', 'solution', 'reference')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
    (err) => {
      if (err) console.error("Error creating 'notes' table:", err);
      else console.log("Table 'notes' is ready.");
    }
  );

  // 创建 categories 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        parent_id INTEGER,
        FOREIGN KEY (parent_id) REFERENCES categories(id)
      )
    `,
    (err) => {
      if (err) console.error("Error creating 'categories' table:", err);
      else console.log("Table 'categories' is ready.");
    }
  );

  // 创建 tags 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        count INTEGER DEFAULT 0
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

  // 创建 note_categories 表
  db.run(
    `
      CREATE TABLE IF NOT EXISTS note_categories (
        note_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        PRIMARY KEY (note_id, category_id),
        FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `,
    (err) => {
      if (err) console.error("Error creating 'note_categories' table:", err);
      else console.log("Table 'note_categories' is ready.");
    }
  );
});

module.exports = db;
