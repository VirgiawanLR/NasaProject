const request = require("supertest");
const app = require("../../app");
const {
  connectingDB,
  disconnectingDB,
} = require("../../infra/database/database.config");
const BASE_API = "/api/v1";

describe("Planets API", () => {
  beforeAll(async () => {
    await connectingDB();
  });

  afterAll(async () => {
    await disconnectingDB();
  });

  describe("Test HTTP GET api/planets/", () => {
    test("It should response with 200 success", async () => {
      await request(app)
        .get(`${BASE_API}/planets`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
