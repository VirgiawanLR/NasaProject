const launches = require("./launches.mongo");
const planets = require("./planets.mongo");
const axios = require("axios");

const SPACEX_API_URL = "https://api.spacexdata.com/v4";
const DEFAULT_FLIGHT_NUMBER = 100;

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch.flightNumber;
}

async function getLaunches(skip, limit) {
  return await launches
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) throw new Error("No matching planet found");

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = {
    ...launch,
    upcoming: true,
    success: true,
    customers: ["BRIN", "NASA"],
    flightNumber: newFlightNumber,
  };
  return await saveLaunch(newLaunch);
}

async function abortLaunch(idNumber) {
  const aborted = await launches.updateOne(
    { flightNumber: idNumber },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted;
}

async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function isLaunchExist(idNumber) {
  return await findLaunch({ flightNumber: idNumber });
}

async function saveLaunch(launch) {
  try {
    return await launches.updateOne(
      { flightNumber: launch.flightNumber },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function populateLaunches() {
  console.log("Downloading data . . .");
  const response = await axios.post(`${SPACEX_API_URL}/launches/query`, {
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  }); // take data from spaceX API

  if (response.status !== 200) {
    console.log("Problem while downloading the data");
    throw new Error("Launch data download fail");
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc.payloads;
    const customers = payloads.flatMap((payload) => {
      return payload.customers;
    });
    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers,
    }; // restructuring the data into our collection

    // populate launches collection with the restructured-launches data
    await saveLaunch(launch);
  }
}

async function loadLaunchesData() {
  try {
    const firstLaunch = await findLaunch({
      flightNumber: 1,
      rocket: "Falcon 1",
      mission: "FalconSat",
    });

    if (firstLaunch) {
      console.log("Launch data already loaded!");
      return;
    } else {
      await populateLaunches();
    }
  } catch (error) {
    console.log(error);
  }
}

async function isAlreadyAborted(idNumber) {
  const targetLaunches = await launches.findOne({ flightNumber: idNumber });
  return targetLaunches.upcoming === false;
}

module.exports = {
  getLaunches,
  abortLaunch,
  isLaunchExist,
  isAlreadyAborted,
  scheduleNewLaunch,
  loadLaunchesData,
};
