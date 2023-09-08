const request = require("supertest");
const app = require("../../app");

describe("Test HTTP GET api/planets/", () => {
  test("It should response with 200 success", async () => {
    await request(app)
      .get("/api/planets")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
