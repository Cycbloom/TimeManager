const mongoose = require("mongoose");
const uri = `${process.env.MONGO_URI.replace(
  "mongodb://",
  "mongodb://root:example@"
)}?authSource=admin`;

async function connect() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri, {
        dbName: process.env.MONGO_DB,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Successfully connected to MongoDB");
    }
    return mongoose.connection.db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

function getDb() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error(
      "Database connection not established. Call connect() first."
    );
  }
  return mongoose.connection.db;
}

module.exports = { connect, getDb };
