const express = require("express");
const launchesRouter = express.Router();
const {
  httpGetLaunches,
  httpCreateLaunch,
  httpDeleteLaunch,
} = require("./launches.controller");

launchesRouter.get("/", httpGetLaunches);
launchesRouter.post("/", httpCreateLaunch);
launchesRouter.delete("/:id", httpDeleteLaunch);

module.exports = launchesRouter;
