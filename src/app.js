import String from './utilit/string.js';
import Number from './utilit/number.js';
import Array from './utilit/array.js';

export default class Validator {
  string() {
    return new String();
  }

  number() {
    return new Number();
  }

  array() {
    return new Array();
  }
}
