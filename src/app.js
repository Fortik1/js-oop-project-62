import String from './utilit/string.js';
import Number from './utilit/number.js';

export default class Validator {
  string() {
    return new String();
  }

  number() {
    return new Number();
  }
}
