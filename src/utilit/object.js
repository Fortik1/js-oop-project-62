export default class CheckObject {
  constructor(fn) {
    this.fn = fn;
  }

  isValid(obj) {
    for (const key in obj) {
      if (!this.paramsCheck[key].isValid(obj[key])) return false;
    }
    return true;
  }

  shape(paramsCheck) {
    this.paramsCheck = paramsCheck;
  }

  test(name, par) {
    this.isValid = (str) => {
      const fn = this.fn.string.get(name);
      return fn(str, par);
    };
    return this;
  }
}
