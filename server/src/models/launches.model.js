const launches = new Map();

let flightID = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler exploration IV",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2023"),
  target: "Kepler-442 b",
  customers: ["BRIN", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function getLaunches() {
  return Array.from(launches.values()).sort(
    (a, b) => a.flightNumber - b.flightNumber
  );
}

function createLaunch(launch) {
  flightID++;
  const newData = {
    flightNumber: flightID,
    ...launch,
    upcoming: true,
    customers: ["BRIN", "NASA"],
    success: true,
  };
  launches.set(flightID, newData);
  return newData;
}

function abortLaunch(idNumber) {
  const aborted = launches.get(idNumber);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

function isLaunchExist(idNumber) {
  return launches.has(idNumber);
}

function isAlreadyAborted(idNumber) {
  return launches.get(idNumber).upcoming === false;
}

module.exports = {
  getLaunches,
  createLaunch,
  abortLaunch,
  isLaunchExist,
  isAlreadyAborted,
};
