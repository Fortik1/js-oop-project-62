const checkRange = (minNum, maxNum) => (num) => {
  const min = minNum;
  const max = maxNum;
  return num >= min && num <= max;
};

export default class Number {
  constructor(fn) {
    this.isValid = () => true;
    this.fn = fn;
  }

  required() {
    this.isValid = (num) => typeof num === 'number' && num > 0;
    return this;
  }

  positive() {
    this.isValid = (num) => num > 0 || num === null;
    return this;
  }

  range(min, max) {
    this.isValid = checkRange(min, max);
    return this;
  }

  test(name, par) {
    this.isValid = (str) => {
      const fn = this.fn.number.get(name);
      return fn(str, par);
    };
    return this;
  }
}
