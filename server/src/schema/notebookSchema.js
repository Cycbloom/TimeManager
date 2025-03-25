const notebookSchema = {
  tableName: "notebooks",
  fields: {
    id: {
      type: "SERIAL",
      primaryKey: true,
    },
    name: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      default: "CURRENT_TIMESTAMP",
    },
    updated_at: {
      type: "TIMESTAMP",
      default: "CURRENT_TIMESTAMP",
    },
  },
};

module.exports = notebookSchema;
