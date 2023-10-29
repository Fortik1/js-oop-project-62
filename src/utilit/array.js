import Validator from "../app";

const checkSizeArray = (sizeArr) => (arr = []) => {
  const size = sizeArr;
  return arr.length === size;
}

export default class ValidatorArray {
  constructor() {
    this.isValid = () => true;
  }

  required() {
    this.isValid = (arr) => Array.isArray(arr);
    return this;
  }

  sizeof(size = 0) {
    this.isValid = checkSizeArray(size);
    return this;
  }

  test(name, par) {
    this.isValid = (str) => {
      const fn = Validator.fn.array.get(name);
      return fn(str, par);
    }
    return this;
  }
}
