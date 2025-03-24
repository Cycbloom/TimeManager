const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;
const client = new MongoClient(uri);
let db;

async function connect() {
  await client.connect();
  db = client.db(dbName);
  return db;
}
module.exports = { connect, getDb: () => db };
