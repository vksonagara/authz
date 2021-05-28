const _ = require("lodash");
const variableRegex = /\$\{(.*?)\}/g;

class PolicyUtils {
  /**
   * Normalize a string like resource or condition keys which uses dynamic context data
   * @param {string} str String to normalie
   * @param {object} contexObject Context object to replace variables in string
   * @returns {string}
   */
  static normalizeString(str, contexObject) {
    const variables = Array.from(str.matchAll(variableRegex));
    const variableMap = {};

    _.forEach(variables, (variable) => {
      variableMap[variable[0]] = variable[1];
    });

    const variableValueMap = {};

    _.forEach(variableMap, (path, key) => {
      const value = _.get(contexObject, path, "");

      variableValueMap[key] = value;
    });

    let finalString = str;

    _.forEach(variableValueMap, (value, key) => {
      finalString = finalString.replace(
        new RegExp(_.escapeRegExp(key), "g"),
        value
      );
    });

    return finalString;
  }

  /**
   * Check if input string matches base string taking into account wildcard(*)
   * @param {string} baseString base string
   * @param {string} inputString input string
   * @returns {boolean} true if inputString matches baseString otherwise false
   */
  static isMatchingString(baseString, inputString) {
    const baseStringArr = baseString.split(":");
    const inputStringArr = inputString.split(":");

    if (inputStringArr.length - baseStringArr.length > 1) {
      return false;
    }

    for (let i = 0; i < baseStringArr.length; i++) {
      if (baseStringArr[i] !== inputStringArr[i]) {
        return inputStringArr[i] === "*";
      }
    }

    if (inputStringArr.length === baseStringArr.length) {
      return true;
    }

    return inputStringArr[inputStringArr.length - 1] === "*";
  }
}

module.exports = PolicyUtils;
