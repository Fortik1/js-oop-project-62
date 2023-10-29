const checkSizeArray = (sizeArr) => (arr = []) => {
  const size = sizeArr;
  return arr.length === size;
}

const params = {
  main: () => true,
  required: (arr) => Array.isArray(arr),
  sizeof: checkSizeArray
}

export default class ValidatorArray {
  constructor(validParams = params.main) {
    this.isValid = validParams;
  }

  required() {
    return new ValidatorArray(params.required);
  }

  sizeof(size = 0) {
    return new ValidatorArray(params.sizeof(size));
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