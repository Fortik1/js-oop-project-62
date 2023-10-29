export default class CheckObject {
  constructor(fn) {
    this.fn = fn;
  }

  isValid(obj) {
    if (obj === null || typeof obj !== 'object') return false;
    
    for (const [name, value] of Object.entries(obj)) {
      if (!this.paramsCheck[name].isValid(value)) return false;
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
