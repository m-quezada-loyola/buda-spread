const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const spreadAlert = require("../models/spreadAlert");
const dbUrl = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/buda-test-post?authSource=admin`;

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

describe("POST /spread/:marketId/alert", () => {
  describe("given a correct market with no alert", () => {
    const market = "btc-clp";
    const spreadAlertData = {
      value: 30000,
    };
    const endpoint = `/spreads/${market}/alert`;
    it("respond with a 200 status code", async () => {
      const response = await request(app).post(endpoint).send(spreadAlertData);
      expect(response.statusCode).toBe(200);
    });
    it("respond with market id", async () => {
      const response = await request(app).post(endpoint).send(spreadAlertData);
      expect(response.body).toHaveProperty("market_id");
    });
    it("respond with market spread alert value", async () => {
      const response = await request(app).post(endpoint).send(spreadAlertData);
      expect(response.body).toHaveProperty("value");
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
    it("respond with a 400 status code", async () => {
      const response = await request(app).post(endpoint).send(spreadAlertValue);
      console.log(response.body);
      expect(response.statusCode).toBe(400);
    });
  });
});
