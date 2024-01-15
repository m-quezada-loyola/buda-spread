const { spreadAlertSchema } = require("../schemas/spreadAlertSchema");
const ExpressError = require("../utils/ExpressError");

module.exports.validateSpreadAlert = (req, res, next) => {
  const { error } = spreadAlertSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
