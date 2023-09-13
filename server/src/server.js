const http = require("http");
const { loadPlanet } = require("./models/planets.model");
const { loadLaunchesData } = require("./models/launches.model");
const db = require("./database/db.config");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function serverListen() {
  db.connectingDB()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));

  await loadPlanet();

  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log("LISTENING ON PORT " + PORT);
  });
}

serverListen();
