import mongoose from "mongoose";
import { connect } from "../config/mongo";
import noteSchema from "./noteSchema";

class MongoSchemaManager {
  private isDevelopment: boolean;
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  private async ensureConnection() {
    for (let i = 0; i < this.maxRetries; i++) {
      try {
        await connect();
        return;
      } catch (error) {
        if (i === this.maxRetries - 1) throw error;
        console.log(`Retrying database connection in ${this.retryDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));
      }
    }
  }

  async syncNoteSchema(): Promise<void> {
    await this.ensureConnection();
    const Note = mongoose.model("notes", noteSchema);

    if (this.isDevelopment) {
      try {
        await Note.collection.drop();
        console.log("Notes collection dropped in development mode");
      } catch (error) {
        // 如果集合不存在，mongoose会抛出错误，这里我们可以安全地忽略它
        if ((error as any).code !== 26) {
          throw error;
        }
      }
    }

    // 确保集合和索引存在
    await Note.createCollection();
    await Note.syncIndexes();

    console.log("Notes collection created with schema");
  }

  async syncAllSchemas(): Promise<void> {
    await this.syncNoteSchema();
  }
}

module.exports = new MongoSchemaManager();
