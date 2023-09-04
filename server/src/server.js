const http = require("http");
const planetModel = require("./models/planets.model");
require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function serverListen() {
  await planetModel.loadPlanet();
  server.listen(PORT, () => {
    console.log("LISTENING ON PORT " + PORT);
  });
}

serverListen();
