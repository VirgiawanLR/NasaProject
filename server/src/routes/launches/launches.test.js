const request = require("supertest"); //http assertions test
const app = require("../../app");

describe("Test HTTP GET api/launches/", () => {
  test("It should response with 200 success", async () => {
    await request(app)
      .get("/api/launches")
      .expect("Content-Type", /json/)
      .expect(200); // integration test
  });
});

describe("Test HTTP POST api/launches/", () => {
  const completeLaunchData = {
    mission: "USS ENTERPRISE",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS ENTERPRISE",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
  };

  test("It Should response with 201 success", async () => {
    const response = await request(app)
      .post("/api/launches") // request sending into app with POST method
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(launchDataWithoutDate);
    // match partially with an object and its key (partially too)
  });

  test("it should catch missing launch property", async () => {
    const response = await request(app)
      .post("/api/launches")
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
      target: "Kepler-186 f",
      launchDate: "hello",
    };

    const response = await request(app)
      .post("/api/launches")
      .send(badLaunchDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: "Invalid Date" });
    // match as strict as it can be (its key and its structure)
  });
});
