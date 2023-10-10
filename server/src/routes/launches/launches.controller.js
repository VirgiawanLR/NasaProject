const {
  getLaunches,
  scheduleNewLaunch,
  isLaunchExist,
  abortLaunch,
  isAlreadyAborted,
} = require("../../infra/models/launches.model");

const { getPagination } = require("../../utils/query");

async function httpGetLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpCreateLaunch(req, res) {
  const { launchDate, target, mission, rocket } = req.body;
  if (!launchDate || !target || !mission || !rocket)
    return res.status(400).json({ error: "Missing launch property" });

  const newLaunchDate = new Date(launchDate);

  if (isNaN(newLaunchDate))
    return res.status(400).json({ error: "Invalid Date" });

  const result = await scheduleNewLaunch({
    ...req.body,
    launchDate: newLaunchDate,
  });

  return res.status(201).json(result);
}

async function httpDeleteLaunch(req, res) {
  const flightNumber = Number(req.params.id);
  if (!(await isLaunchExist(flightNumber)))
    return res.status(404).json({ error: "Mission Not Exist" });

  if (await isAlreadyAborted(flightNumber))
    return res.status(404).json({ error: "Already aborted" });

  const response = await abortLaunch(flightNumber);
  return res.status(200).send(response);
}

module.exports = { httpGetLaunches, httpCreateLaunch, httpDeleteLaunch };
