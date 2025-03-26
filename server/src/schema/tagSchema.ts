import { ITag } from "../types/tag";
import { ISchema } from "../types/schema";

const tagSchema: ISchema<ITag> = {
  tableName: "tags",
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

export default tagSchema;
