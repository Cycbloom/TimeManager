const { Pool } = require("pg");
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
module.exports = pool;

//删除notebook表
// const deleteNotebookTable = `
// DROP TABLE IF EXISTS notebooks;
// `;

// pool.query(deleteNotebookTable, (err, res) => {
//   if (err) {
//     console.error('删除 notebook 表时出错:', err);
//   }
//   else {
//     console.log('notebook 表已删除');
//   }
// })

// 创建 notebook 表的 SQL 语句
const createNotebookTable = `
CREATE TABLE IF NOT EXISTS notebooks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

pool.query(createNotebookTable, (err, res) => {
  if (err) {
    console.error('创建 notebook 表时出错:', err);
  } else {
    console.log('notebook 表已创建或已存在');
  }
});
