const pool = require("../config/postgres");
const notebookSchema = require("./notebookSchema");

class SchemaManager {
  constructor() {
    this.schemas = {
      notebooks: notebookSchema,
    };
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  async syncSchema(schemaName) {
    const schema = this.schemas[schemaName];
    if (!schema) {
      throw new Error(`Schema ${schemaName} not found`);
    }

    const { tableName, fields } = schema;

    // 在开发模式下，先删除已存在的表
    if (this.isDevelopment) {
      try {
        await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
        console.log(`Table ${tableName} dropped in development mode`);
      } catch (error) {
        console.error(`Error dropping table ${tableName}:`, error);
      }
    }

    const columns = [];

    for (const [fieldName, fieldDef] of Object.entries(fields)) {
      let columnDef = `${fieldName} ${fieldDef.type}`;

      if (fieldDef.primaryKey) {
        columnDef += " PRIMARY KEY";
      }
      if (fieldDef.notNull) {
        columnDef += " NOT NULL";
      }
      if (fieldDef.default) {
        columnDef += ` DEFAULT ${fieldDef.default}`;
      }

      columns.push(columnDef);
    }

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${columns.join(",\n        ")}
      );
    `;

    try {
      await pool.query(createTableSQL);
      console.log(`Table ${tableName} synced successfully`);
    } catch (error) {
      console.error(`Error syncing table ${tableName}:`, error);
      throw error;
    }
  }

  async syncAllSchemas() {
    for (const schemaName of Object.keys(this.schemas)) {
      await this.syncSchema(schemaName);
    }
  }
}

module.exports = new SchemaManager();
