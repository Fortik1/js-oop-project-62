export default class Object {
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
    const newFun = (par) => (str) => {
      const param = par;
      const fn = Validator.fn.string.get(name);
      return fn(str, param);
    }
    return new String(newFun(par));
  }
}