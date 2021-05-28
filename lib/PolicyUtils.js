const _ = require("lodash");
const variableRegex = /\$\{(.*?)\}/g;

class PolicyUtils {
  /**
   * Normalize a string like resource or condition keys which uses dynamic context data
   * @param {*} str String to normalie
   * @param {*} contexObject Context object to replace variables in string
   * @returns string
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
}

module.exports = PolicyUtils;
