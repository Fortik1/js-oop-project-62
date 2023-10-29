import Validator from "../app";

const checkContains = (checkStr = '') => (str) => {
  const checkValidStr = checkStr;
  return str.includes(checkValidStr);
};

const checkMinLength = (lengthStr = 0) => (str = '') => {
  if (str === '') return false;
  const minLength = lengthStr;
  return str.length >= minLength;
};

const params = {
  main: () => true,
  required: (str) => (typeof str === 'string' && str !== '' && str !== null ),
  contains: checkContains,
  minLength: checkMinLength,
};

export default class String {
  constructor(ValidParams = params.main) {
    this.isValid = ValidParams;
  }

  required() {
    return new String(params.required);
  }

  contains(str) {
    return new String(params.contains(str));
  }

  minLength(lengthStr) {
    return new String(params.minLength(lengthStr));
  }

  test(name, par) {
    const newFun = (par) => (str) => {
      const param = par;
      const fn = Validator.fn.string.get(name);
      return fn(str, param);
    }
    return new String(newFun(par));
  }
}
