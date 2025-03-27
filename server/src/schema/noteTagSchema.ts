import { INoteTag } from "../types/note_tag";
import { ISchema } from "../types/schema";

const noteTagSchema: ISchema<INoteTag> = {
  tableName: "note_tags",
  fields: {
    note_id: {
      type: "VARCHAR(24)",
      notNull: true,
      // MongoDB ObjectId is a 24-character hex string
      // No foreign key constraint since notes are in MongoDB
    },
    tag_id: {
      type: "INTEGER",
      notNull: true,
      foreignKey: {
        table: "tags",
        field: "id",
      },
    },
  },
};

export default noteTagSchema;
