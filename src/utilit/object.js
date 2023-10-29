import Validator from '../app.js';

export default class CheckObject {
  isValid(obj) {
    if (typeof obj !== 'object') return false;
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
      const fn = Validator.fn.string.get(name);
      return fn(str, par);
    };
    return this;
  }
}
