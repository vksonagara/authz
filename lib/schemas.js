const Joi = require("joi");

const policySchema = Joi.object({
  Version: Joi.string(),
  Statement: Joi.array().items(
    Joi.object({
      Sid: Joi.string(),
      Effect: Joi.string().valid("Allow", "Deny").required(),
      Action: Joi.array().items(Joi.string().required()).min(1),
      Resource: Joi.string(),
      Condition: Joi.object({
        StringEquals: Joi.object(),
        StringNotEquals: Joi.object(),
        StringEqualsIgnoreCase: Joi.object(),
        StringNotEqualsIgnoreCase: Joi.object(),
        StringLike: Joi.object(),
        StringNotLike: Joi.object(),
        NumericEquals: Joi.object(),
        NumericNotEquals: Joi.object(),
        NumericLessThan: Joi.object(),
        NumericLessThanEquals: Joi.object(),
        NumericGreaterThan: Joi.object(),
        NumericGreaterThanEquals: Joi.object(),
        DateEquals: Joi.object(),
        DateNotEquals: Joi.object(),
        DateLessThan: Joi.object(),
        DateLessThanEquals: Joi.object(),
        DateGreaterThan: Joi.object(),
        DateGreaterThanEquals: Joi.object(),
        Bool: Joi.object(),
        IpAddress: Joi.object(),
        NotIpAddress: Joi.object(),
      }),
    })
  ),
});

const policyPayloadSchema = Joi.object({
  Action: Joi.string().required(),
  Resource: Joi.string().required(),
  Context: Joi.object(),
});

module.exports = { policySchema, policyPayloadSchema };
