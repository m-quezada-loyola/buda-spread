const request = require("supertest");

const app = require("../app");

describe("GET /spread", () => {
  describe("with a valid market pair", () => {
    const market = "eth-clp";
    const endpoint = `/spreads/${market}`;
    it("respond with a 200 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(200);
    });
    it("respond with market data", async () => {
      const response = await request(app).get(endpoint);
      expect(response.body).toHaveProperty["market"];
    });
    it("return the actual spread", async () => {
      const response = await request(app).get(endpoint);
      expect(response.body["market"]).toHaveProperty["spread"];
    });
  });
  describe("with a invalid market pair", () => {
    const market = "vtc-etj";
    const endpoint = `/spreads/${market}`;
    it("respond with a 400 status code", async () => {
      const response = await request(app).get(endpoint);
      expect(response.statusCode).toBe(400);
    });
    it("respond with error message", async () => {
      const response = await request(app).get(endpoint);
      expect(response.body).toHaveProperty("message");
    });
  });
});
