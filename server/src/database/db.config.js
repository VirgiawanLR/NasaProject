// const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const mongoose = require("mongoose");
const MONGO_DB_URL = process.env.MONGO_URL;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(MONGO_DB_URL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
async function connectingDB() {
  await mongoose.connect(MONGO_DB_URL, {
    dbName: "nasaProject",
    maxPoolSize: 10,
    minPoolSize: 5,
    serverSelectionTimeoutMS: 15000,
  });
}

async function disconnectingDB() {
  await mongoose.disconnect();
}

module.exports = {
  connectingDB,
  disconnectingDB,
};
