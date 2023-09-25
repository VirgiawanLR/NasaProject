const express = require("express");
const cors = require("cors"); // cross origin, allowing/not allowing an IP to access our server
const path = require("path");
const morgan = require("morgan");
const apiV1 = require("./routes/api");
const helmet = require("helmet"); // for a comprehensive security, read the documentation for complete
// security handled by helmet

const app = express();
app.use(helmet());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
// for allowing direct-accessing our public folder in our server

app.use(
  cors({
    origin: "http://localhost:3000", // for whitelisting an IP to access our server
  })
);
app.use(morgan("combined")); // to consoling every API hit to our server

app.use("/api/v1", apiV1);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
