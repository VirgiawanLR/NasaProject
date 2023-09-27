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

// make a self-signed certificate for a development => openssl
// openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365

// explaination :
// openssl req => requesting a new certificate
// -x509 => self-sign certificate
// -newkey => secret use in the encryption / private key
// rsa:4096 => rsa encryption format, a strong format of an encryption, widely used.
// the 4096 is the size of key (bits), larger size is stronger
// -nodes => access key without need assign new password
// -keyout key.pem => the output file that contain the key
// -out cert.pem => the output file for the certificate, in this case is self-signed.
// -days 365 =>
