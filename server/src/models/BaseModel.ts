import pool from "../config/postgres";
import { QueryParams, CreateData, UpdateData } from "../types/model";

class BaseModel<T> {
  protected tableName: string;
  protected hasCreatedAt: T extends { created_at: Date } ? true : false;
  protected hasUpdatedAt: T extends { updated_at: Date } ? true : false;
  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected processRow(row: any) {
    const processedRow = { ...row };
    if ("created_at" in processedRow) {
      delete processedRow.created_at;
    }
    if ("updated_at" in processedRow) {
      delete processedRow.updated_at;
    }
    return processedRow;
  }

  async find(query: QueryParams = {}) {
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
    } else if (this.hasCreatedAt) {
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
    return result.rows.map((row) => this.processRow(row));
  }

  async create(data: CreateData<T>) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = values.map((_, index) => `$${index + 1}`).join(", ");

    const result = await pool.query(
      `INSERT INTO ${this.tableName} (${columns.join(", ")}) 
             VALUES (${placeholders}) RETURNING *`,
      values
    );
    return this.processRow(result.rows[0]);
  }

  async update(id: number, data: UpdateData<T>) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const setClause = columns
      .map((col, index) => `${col} = $${index + 1}`)
      .join(", ");
    const updateDateClause = `, updated_at = CURRENT_TIMESTAMP`;

    const result = await pool.query(
      `UPDATE ${this.tableName} 
             SET ${setClause} ${this.hasUpdatedAt ? updateDateClause : ""}
             WHERE id = $${columns.length + 1} RETURNING *`,
      [...values, id]
    );
    return this.processRow(result.rows[0]);
  }

  async delete(id: number) {
    const result = await pool.query(
      `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`,
      [id]
    );
    return this.processRow(result.rows[0]);
  }
}

export default BaseModel;
