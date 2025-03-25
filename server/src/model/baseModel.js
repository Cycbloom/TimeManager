const pool = require("../config/postgres");

class BaseModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async find(query = {}) {
    let sqlQuery = `SELECT * FROM ${this.tableName}`;
    const values = [];
    let paramCount = 0;

    // 处理WHERE条件
    if (Object.keys(query).length > 0) {
      const conditions = [];
      for (const [key, value] of Object.entries(query)) {
        if (key !== "orderBy" && key !== "page" && key !== "limit") {
          paramCount++;
          conditions.push(`${key} = $${paramCount}`);
          values.push(value);
        }
      }
      if (conditions.length > 0) {
        sqlQuery += ` WHERE ${conditions.join(" AND ")}`;
      }
    }

    // 处理排序
    if (query.orderBy) {
      const [field, direction] = query.orderBy.split(":");
      sqlQuery += ` ORDER BY ${field} ${
        direction?.toUpperCase() === "DESC" ? "DESC" : "ASC"
      }`;
    } else {
      sqlQuery += ` ORDER BY created_at DESC`;
    }

    // 处理分页
    if (query.page && query.limit) {
      const offset = (query.page - 1) * query.limit;
      paramCount++;
      sqlQuery += ` LIMIT $${paramCount}`;
      values.push(query.limit);
      paramCount++;
      sqlQuery += ` OFFSET $${paramCount}`;
      values.push(offset);
    }

    const result = await pool.query(sqlQuery, values);
    return result.rows;
  }

  async create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    const result = await pool.query(
      `INSERT INTO ${this.tableName} (${columns.join(", ")}) 
             VALUES (${placeholders}) RETURNING *`,
      values
    );
    return result.rows[0];
  }

  async update(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns
      .map((col, index) => `${col} = $${index + 1}`)
      .join(", ");

    const result = await pool.query(
      `UPDATE ${this.tableName} 
             SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
             WHERE id = $${columns.length + 1} RETURNING *`,
      [...values, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
}

module.exports = BaseModel;
