import Validator from '../app.js';

const checkContains = (checkStr) => (str) => {
  if (typeof str !== 'string') return false;
  const checkValidStr = checkStr;
  return str.includes(checkValidStr);
};

const checkMinLength = (lengthStr = 0) => (str = '') => {
  if (str === '' || typeof str !== 'string') return false;
  const minLength = lengthStr;
  return str.length >= minLength;
};

export default class String {
  constructor() {
    this.isValid = () => true;
  }

  required() {
    this.isValid = (str) => (str ? typeof str === 'string' : false);
    return this;
  }

  contains(str = '') {
    this.isValid = checkContains(str);
    return this;
  }

  minLength(lengthStr) {
    this.isValid = checkMinLength(lengthStr);
    return this;
  }

  test(name, par) {
    this.isValid = (str) => {
      const fn = Validator.fn.string.get(name);
      return fn(str, par);
    };
    return this;
  }
}
