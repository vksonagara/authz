const Joi = require("joi");
const constants = require("./constants");

const policySchema = Joi.object({
  Version: Joi.string(),
  Statements: Joi.array().items(
    Joi.object({
      Sid: Joi.string(),
      Effect: Joi.string()
        .valid(constants.EFFECT.ALLOW, constants.EFFECT.DENY)
        .required(),
      Actions: Joi.array().items(Joi.string().required()).min(1).required(),
      Resource: Joi.string().required(),
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
