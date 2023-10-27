const checkRange = (minNum, maxNum) => (num) => {
  const min = minNum;
  const max = maxNum;
  return num >= min && num <= max;
};

const params = {
  main: () => true,
  required: (num) => typeof num === 'number',
  positive: (num) => num > 0,
  range: checkRange,
};

export default class Number {
  constructor(validParams = params.main) {
    this.isValid = validParams;
  }

  required() {
    return new Number(params.required);
  }

  positive() {
    return new Number(params.positive);
  }

  range(min, max) {
    return new Number(params.range(min, max));
  }
}
