const Joi = require("joi");

module.exports.spreadAlertSchema = Joi.object({
  alert_value: Joi.number().required().min(0),
});
