const _ = require("lodash");
const { policySchema, policyPayloadSchema } = require("./schemas");
const PolicyUtils = require("./PolicyUtils");
const ConditionUtils = require("./ConditionUtils");
const constants = require("./constants");

class PolicyEnforcer {
  constructor(policies) {
    const validPolicies = PolicyEnforcer.validatePolicies(policies);

    if (!validPolicies) {
      throw new Error("Invalid policies");
    }

    this.policies = policies;
  }

  /**
   * Function to check if array of policy is valid or not
   * @param {*} policies
   * @returns true if all policies are valid otherwise false
   */
  static validatePolicies(policies) {
    let isValid = true;

    _.forEach(policies, (policy) => {
      const { error } = policySchema.validate(policy);

      if (error) {
        // console.log(error);
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Function to check if a policy is valid or not
   * @param {*} policy
   * @returns true if policy is valid otherwise false
   */
  static validatePolicy(policy) {
    const { error } = policySchema.validate(policy);

    return error ? false : true;
  }

  /**
   * Function to check if loaded policies meets the criteria for payload policy
   * @param {*} payload
   * @returns true if loaded policies meets the criteria otherwise false
   */
  evaluatePolicy(payload) {
    const { error } = policyPayloadSchema.validate(payload);

    if (error) {
      throw new Error("Invalid policy payload");
    }

    const { Action, Resource, Context } = payload;
    let isAllowed = false;
    let isDenied = false;

    _.forEach(this.policies, (policy) => {
      const { Statements } = policy;

      _.forEach(Statements, (statement) => {
        let hasMatchingAction = false;
        let hasMatchingResource = false;
        let isConditions = true;

        // Checking if one of the action is matching or not
        _.forEach(statement.Actions, (action) => {
          hasMatchingAction =
            hasMatchingAction || PolicyUtils.isMatchingString(Action, action);
        });

        // Checking if resource is matching or not
        hasMatchingResource =
          hasMatchingResource ||
          PolicyUtils.isMatchingString(
            PolicyUtils.normalizeString(Resource, Context),
            PolicyUtils.normalizeString(statement.Resource, Context)
          );

        _.forEach(statement.Condition, (ConditionValue, ConditionType) => {
          let isCondition = false;

          // If any of conditions is true in condition type, set isCondition true
          _.forEach(ConditionValue, (value, key) => {
            isCondition =
              isCondition ||
              ConditionUtils[ConditionType](
                PolicyUtils.normalizeString(key, Context),
                PolicyUtils.normalizeString(value, Context)
              );
          });

          // If any of isCondition is false, set isCondtions to false otherwise true
          isConditions = isConditions && isCondition;
        });

        if (statement.Effect === constants.EFFECT.ALLOW) {
          isAllowed =
            isAllowed ||
            (hasMatchingAction && hasMatchingResource && isConditions);
        } else {
          if (hasMatchingAction && hasMatchingResource && isConditions)
            isDenied = true;
        }
      });
    });

    return isAllowed && !isDenied;
  }
}

module.exports = PolicyEnforcer;
