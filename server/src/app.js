const express = require("express");
const app = express();
const notebookRouter = require("./router/notebookRouter");
const tagRouter = require("./router/tagRouter");
const noteRouter = require("./router/noteRouter");
const pool = require("./config/postgres");
const schemaManager = require("./schema/schemaManager");
const mongoSchemaManager = require("./schema/mongoSchemaManager");

// 解析 JSON 数据的中间件
app.use(express.json());

// 连接数据库并同步Schema
pool.connect(async (err, client, release) => {
  if (err) {
    console.error("Error connecting to the database", err);
    process.exit(1);
  }
  console.log("Connected to the database");
  release();

  try {
    await schemaManager.syncAllSchemas();
    console.log("Database schemas synced successfully");
  } catch (error) {
    console.error("Error syncing database schemas:", error);
    process.exit(1);
  }

  try {
    await mongoSchemaManager.syncAllSchemas();
    console.log("MongoDB schemas synced successfully");
  } catch (error) {
    console.error("Error syncing MongoDB schemas:", error);
    process.exit(1);
  }
});

app.use("/api/notebooks", notebookRouter);
app.use("/api/tags", tagRouter);
app.use("/api/notes", noteRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
