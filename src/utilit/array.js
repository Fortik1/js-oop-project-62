const checkSizeArray = (sizeArr) => (arr = []) => {
  const size = sizeArr;
  return arr.length === size;
};

export default class ValidatorArray {
  constructor(fn) {
    this.isValid = () => true;
    this.fn = fn;
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
      const fn = this.fn.array.get(name);
      return fn(str, par);
    };
    return this;
  }
}
