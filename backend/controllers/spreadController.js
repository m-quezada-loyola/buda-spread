const budaService = require("../services/budaService");
const spreadService = require("../services/spreadService");
const spreadAlert = require("../models/spreadAlert");
const ExpressError = require("../utils/ExpressError");

module.exports.getAllSpreads = async (req, res) => {
  const markets = await budaService.getAllMarkets();
  const marketIds = budaService.getMarketIds(markets);
  const marketTickers = await budaService.getAllTickers(marketIds);
  const marketSpreads = spreadService.calculateAllSpreads(marketTickers);
  res.json(marketSpreads);
};

module.exports.getMarketSpread = async (req, res) => {
  const { marketId } = req.params;
  const marketTicker = await budaService.getMarketTicker(marketId);
  const marketSpread = spreadService.calculateMarketSpread(marketTicker);
  res.json(marketSpread);
};

module.exports.getMarketSpreadStatus = async (req, res) => {
  const { marketId } = req.params;
  const marketTicker = await budaService.getMarketTicker(marketId);
  const { market } = spreadService.calculateMarketSpread(marketTicker);
  const alert = await spreadAlert.findOne({
    market_id: marketId,
  });
  if (!alert) {
    throw new ExpressError(`Bad request. ${marketId} has no alert`, 400);
  }
  const alertValue = alert['alert_value']
  const status =
    market["spread"] > alertValue
      ? "Higher"
      : market["spread"] < alertValue
      ? "Lower"
      : "Equal";

  const marketSpreadStatus = {
    market: {
      market_id: marketId,
      status: status,
      alert_value: alertValue,
      spread: market["spread"],
    },
  };

  res.json(marketSpreadStatus);
};

module.exports.setSpreadAlert = async (req, res) => {
  const { marketId } = req.params;
  const { alert_value: alertValue } = req.body;
  const marketTicker = await budaService.getMarketTicker(marketId);

  if (marketTicker) {
    actualAlert = await spreadAlert.findOne({ market_id: marketId });
    if (actualAlert) {
      throw new ExpressError(
        `Market ${marketId} already has a spread alert`,
        400
      );
    }
    const spreadAlertData = {
      market_id: marketId,
      alert_value: parseFloat(alertValue),
    };

    const newSpreadAlert = new spreadAlert(spreadAlertData);
    await newSpreadAlert.save();
    res.json(spreadAlertData);
  }
};
