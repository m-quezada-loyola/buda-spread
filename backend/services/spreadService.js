
module.exports.calculateMarketSpread = (marketTicker) => {
  const { market_id, min_ask, max_bid } = marketTicker;
  const spread = parseFloat(min_ask[0]) - parseFloat(max_bid[0]);
  const marketSpread = { market: { market_id: market_id, spread: spread } };
  return marketSpread;
};

module.exports.calculateAllSpreads = (marketTickers) => {
  const spreads = marketTickers.map(
    (marketTicker) => this.calculateMarketSpread(marketTicker)["market"]
  );
  const marketSpreads = { markets: spreads };
  return marketSpreads;
};