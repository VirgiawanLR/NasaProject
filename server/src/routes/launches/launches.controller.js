const {
  getLaunches,
  createLaunch,
  isLaunchExist,
  abortLaunch,
  isAlreadyAborted,
} = require("../../models/launches.model");

function httpGetLaunches(req, res) {
  return res.status(200).json(getLaunches());
}

function httpCreateLaunch(req, res) {
  const { launchDate, target, mission, rocket } = req.body;
  if (!launchDate || !target || !mission || !rocket)
    return res.status(400).json({ error: "Missing launch property" });
  const newLaunchDate = new Date(launchDate);
  if (isNaN(newLaunchDate))
    return res.status(400).json({ error: "Invalid Date" });
  const result = createLaunch({
    ...req.body,
    launchDate: newLaunchDate,
  });
  return res.status(201).json(result);
}

function httpDeleteLaunch(req, res) {
  const flightNumber = Number(req.params.id);
  if (!isLaunchExist(flightNumber) || isAlreadyAborted(flightNumber))
    return res.status(404).json({ error: "Mission Not Exist" });
  const response = abortLaunch(flightNumber);
  return res.status(200).json(response);
}

module.exports = { httpGetLaunches, httpCreateLaunch, httpDeleteLaunch };
