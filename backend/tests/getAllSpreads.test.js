const request = require("supertest");

const app = require("../app");

describe("GET /spreads", () => {
  it("respond with a 200 status code", async () => {
    const response = await request(app).get("/spreads").send();
    expect(response.statusCode).toBe(200);
  });
  it("respond with all markets", async () => {
    const response = await request(app).get("/spreads").send();
    expect(response.body).toHaveProperty("markets");
  });
});
