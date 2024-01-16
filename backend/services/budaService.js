const ExpressError = require("../utils/ExpressError");


const BUDA_BASE_URL = "https://www.buda.com/api/v2";

module.exports.getAllMarkets = async () => {
  const response = await fetch(`${BUDA_BASE_URL}/markets`);
  if (!response.ok) {
    throw new ExpressError(`Bad request. ${BUDA_BASE_URL}/markets is not a valid endpoint`, 400)
  }
  const markets = await response.json();
  return markets["markets"];
};

module.exports.getMarketTicker = async (marketId) => {
  const response = await fetch(`${BUDA_BASE_URL}/markets/${marketId}/ticker`);
  if (!response.ok){
    throw new ExpressError(`Bad request. ${marketId} is not a valid market`, 400)
  }
  const marketTicker = await response.json();
  return marketTicker["ticker"];
};

module.exports.getAllTickers = async (marketIds) => {
  const marketTickers = await Promise.all(
    marketIds.map(async (marketId) => {
      return await this.getMarketTicker(marketId);
    })
  );
  return marketTickers;
};

module.exports.getMarketIds = (markets) => {
  return (marketIds = markets.map((market) => market["id"]));
};
