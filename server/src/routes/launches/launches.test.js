const request = require("supertest"); //http assertions test
const app = require("../../app");
const { connectingDB, disconnectingDB } = require("../../database/db.config");
const { loadLaunchesData } = require("../../models/launches.model");
const BASE_API = "/api/v1";

describe("launches API", () => {
  beforeAll(async () => {
    await connectingDB()
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => console.log(err));
    await loadLaunchesData();
  });

  afterAll(async () => {
    await disconnectingDB();
  });

  describe("Test HTTP GET api/launches/", () => {
    test("It should response with 200 success", async () => {
      await request(app)
        .get(`${BASE_API}/launches`)
        .expect("Content-Type", /json/)
        .expect(200); // integration test
    });
  });

  describe("Test HTTP POST api/launches/", () => {
    const completeLaunchData = {
      mission: "USS ENTERPRISE",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };

    const launchDataWithoutDate = {
      mission: "USS ENTERPRISE",
      rocket: "NCC 1701-D",
      target: "Kepler-62 f",
    };

    test("It Should response with 201 success", async () => {
      const response = await request(app)
        .post(`${BASE_API}/launches`) // request sending into app with POST method
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);
      // console.log(response);
      // const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      // const responseDate = new Date(response.body.launchDate).valueOf();
      // expect(responseDate).toBe(requestDate);
      // expect(response.body).toMatchObject(launchDataWithoutDate);
      // // match partially with an object and its key (partially too)
    });

    test("it should catch missing launch property", async () => {
      const response = await request(app)
        .post(`${BASE_API}/launches`)
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({ error: "Missing launch property" });
      // match as strict as it can be (its key and its structure)
    });

    test("it should catch invalid date", async () => {
      const badLaunchDate = {
        mission: "USS ENTERPRISE",
        rocket: "NCC 1701-D",
        target: "Kepler-24 f",
        launchDate: "hello",
      };

      const response = await request(app)
        .post(`${BASE_API}/launches`)
        .send(badLaunchDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({ error: "Invalid Date" });
      // match as strict as it can be (its key and its structure)
    });
  });
});
