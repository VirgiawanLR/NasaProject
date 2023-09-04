const express = require("express");
const cors = require("cors");
const planetRouter = require("./routes/planets/planets.route");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/planets", planetRouter);

module.exports = app;
