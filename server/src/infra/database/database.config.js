// const { MongoClient, ServerApiVersion } = require('mongodb');
const { database: dbConfig } = require("../../config/config");
const mongoose = require("mongoose");

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
  await mongoose
    .connect(dbConfig.url, {
      dbName: dbConfig.db_name,
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 15000,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));
}

async function disconnectingDB() {
  await mongoose
    .disconnect()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  connectingDB,
  disconnectingDB,
};
