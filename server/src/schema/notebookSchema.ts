import { INotebook } from "../types/notebook";
import { ISchema } from "../types/schema";

const notebookSchema: ISchema<INotebook> = {
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

export default notebookSchema;
