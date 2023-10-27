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
  required: (str) => (!!(typeof str === 'string' && str !== '')),
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
}
