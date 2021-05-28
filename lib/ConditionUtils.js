const ConditionUtils = {
  StringEquals(baseString, inputString) {
    return baseString == inputString;
  },
  StringNotEquals(baseString, inputString) {
    return baseString != inputString;
  },
  StringEqualsIgnoreCase(baseString, inputString) {
    return baseString.toLowerCase() === inputString.toLowerCase();
  },
  StringNotEqualsIgnoreCase(baseString, inputString) {
    return baseString.toLowerCase() !== inputString.toLowerCase();
  },
  StringLike(baseString, inputStringArr) {
    // Todo
    return true;
  },
  StringNotLike(baseString, inputStringArr) {
    // Todo
    return true;
  },
  NumericEquals(baseNumber, inputNumber) {
    baseNumber = +baseNumber;
    inputNumber = +inputNumber;

    if (isNaN(baseNumber) || isNaN(inputNumber)) {
      return false;
    }

    return baseNumber === inputNumber;
  },
  NumericNotEquals(baseNumber, inputNumber) {
    baseNumber = +baseNumber;
    inputNumber = +inputNumber;

    if (isNaN(baseNumber) || isNaN(inputNumber)) {
      return false;
    }

    return baseNumber !== inputNumber;
  },
  NumericLessThan(baseNumber, inputNumber) {
    baseNumber = +baseNumber;
    inputNumber = +inputNumber;

    if (isNaN(baseNumber) || isNaN(inputNumber)) {
      return false;
    }

    return inputNumber < baseNumber;
  },
  NumericLessThanEquals(baseNumber, inputNumber) {
    baseNumber = +baseNumber;
    inputNumber = +inputNumber;

    if (isNaN(baseNumber) || isNaN(inputNumbe)) {
      return false;
    }

    return inputNumber <= baseNumber;
  },
  NumericGreaterThan(baseNumber, inputNumber) {
    baseNumber = +baseNumber;
    inputNumber = +inputNumber;

    if (isNaN(baseNumber) || isNaN(inputNumber)) {
      return false;
    }

    return inputNumber > baseNumber;
  },
  NumericGreaterThanEquals(baseNumber, inputNumber) {
    baseNumber = +baseNumber;
    inputNumber = +inputNumber;

    if (isNaN(baseNumber) || isNaN(inputNumber)) {
      return false;
    }

    return inputNumber >= baseNumber;
  },
  DateEquals(baseDate, inputDate) {
    baseDate = new Date(baseDate);
    inputDate = new Date(inputDate);

    if (isNaN(baseDate.getTime()) || isNaN(inputDate.getTime())) {
      return false;
    }

    return baseDate.getTime() === inputDate.getTime();
  },
  DateNotEquals(baseDate, inputDate) {
    baseDate = new Date(baseDate);
    inputDate = new Date(inputDate);

    if (isNaN(baseDate.getTime()) || isNaN(inputDate.getTime())) {
      return false;
    }

    return baseDate.getTime() !== inputDate.getTime();
  },
  DateLessThan(baseDate, inputDate) {
    baseDate = new Date(baseDate);
    inputDate = new Date(inputDate);

    if (isNaN(baseDate.getTime()) || isNaN(inputDate.getTime())) {
      return false;
    }

    return inputDate.getTime() < baseDate.getTime();
  },
  DateLessThanEquals(baseDate, inputDate) {
    baseDate = new Date(baseDate);
    inputDate = new Date(inputDate);

    if (isNaN(baseDate.getTime()) || isNaN(inputDate.getTime())) {
      return false;
    }

    return inputDate.getTime() <= baseDate.getTime();
  },
  DateGreaterThan(baseDate, inputDate) {
    baseDate = new Date(baseDate);
    inputDate = new Date(inputDate);

    if (isNaN(baseDate.getTime()) || isNaN(inputDate.getTime())) {
      return false;
    }

    return inputDate.getTime() > baseDate.getTime();
  },
  DateGreaterThanEquals(baseDate, inputDate) {
    baseDate = new Date(baseDate);
    inputDate = new Date(inputDate);

    if (isNaN(baseDate.getTime()) || isNaN(inputDate.getTime())) {
      return false;
    }

    return inputDate.getTime() >= baseDate.getTime();
  },
  Bool(base, input) {
    return base === input;
  },
  IpAddress(baseIp, inputIp) {
    const ip4ToInt = (ip) => {
      return Number(
        ip
          .split(".")
          .map((d) => ("000" + d).substr(-3))
          .join("")
      );
    };
    const isIp4InCidr = (ip, cidr) => {
      const [range, bits = 32] = cidr.split("/");
      const mask = ~(2 ** (32 - bits) - 1);

      return (ip4ToInt(ip) & mask) === (ip4ToInt(range) && mask);
    };

    return isIp4InCidr(inputIp, baseIp);
  },
  NotIpAddress(baseIp, inputIp) {
    return !this.IpAddress(baseIp, inputIp);
  },
};

module.exports = ConditionUtils;
