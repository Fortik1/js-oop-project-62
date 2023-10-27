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
}