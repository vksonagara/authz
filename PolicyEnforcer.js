const { policySchema, policyPayloadSchema } = require("./schemas");
const _ = require("lodash");

class PolicyEnforcer {
  constructor(policies) {
    const validPolicies = this.validatePolicies(policies);

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
      throw new Error("Invalid payload");
    }

    // Write logic to check if loaded policies has sufficient for permissions for this payload policy
  }
}

module.exports = PolicyEnforcer;
