const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const spreadAlert = require("../models/spreadAlert");
const dbUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/buda-test-get?authSource=admin`;

beforeEach(async () => {
  await mongoose.connect(dbUrl).catch((error) => {
    console.log(error);
  });
  await spreadAlert.deleteMany({});
});

afterEach(async () => {
  await spreadAlert.deleteMany({});
  await mongoose.disconnect();
});

describe("GET /spread/:marketId/alert", () => {
  describe("given a correct market with no alert", () => {
    const market = "eth-clp";
    const endpoint = `/spreads/${market}/alert`;
    it("respond with a 400 code stastus", async () => {
      const response = await request(app).get(endpoint).send();
      expect(response.statusCode).toBe(400);
    });
    it("respond with error message", async () => {
      const response = await request(app).get(endpoint).send();
      expect(response.body).toHaveProperty("message");
    });
  });
  describe("given a correct market with alert", () => {
    const market = "btc-clp";
    const endpoint = `/spreads/${market}/alert`;
    const spreadAlertValue = { value: 30000 };
    beforeEach(async () => {
      const spreadAlertData = {
        market_id: market,
        value: spreadAlertValue["value"],
      };
      const newSpreadAlert = new spreadAlert(spreadAlertData);
      await newSpreadAlert.save();
    });
    it("respond with a 200 code status", async () => {
      const response = await request(app).get(endpoint).send();
      expect(response.statusCode).toBe(200);
    });
    it("respond with market data", async () => {
      const response = await request(app).get(endpoint).send();
      expect(response.body).toHaveProperty("market");
    });
    it("response has alert value", async () => {
      const response = await request(app).get(endpoint).send();
      expect(response.body["market"]).toHaveProperty("alert_value");
    });
    it("response has actual spread value", async () => {
      const response = await request(app).get(endpoint).send();
      expect(response.body["market"]).toHaveProperty("spread");
    });
  });
});
