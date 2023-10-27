const params = {
  main: () => true,
  required: (str) => (!!(typeof str === 'string' && str !== '')),
};

export default class String {
  constructor(isValidParams = params.main) {
    this.isValid = isValidParams;
  }

  required() {
    return new String(params.required);
  }
}
