export default class CheckObject {
  constructor(fn) {
    this.isValid = () => true;
    this.fn = fn;
  }

  shape(paramsCheck) {
    this.isValid = (obj) => {
      if (obj === null || typeof obj !== 'object') return false;

      try {
        Object.entries(obj).forEach(([name, value]) => {
          if (!this.paramsCheck[name].isValid(value)) throw new Error();
        });
        return true;
      } catch (e) {
        return false;
      }
    };
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
