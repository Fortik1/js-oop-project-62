import String from './utilit/string.js';
import Number from './utilit/number.js';
import Array from './utilit/array.js';
import Object from './utilit/object.js';

export default class Validator {
  static fn = {
    string: new Map(),
    array: new Map(),
    numver: new Map(),
    object: new Map(),
  }

  string() {
    return new String();
  }

  number() {
    return new Number();
  }

  array() {
    return new Array();
  }

  object() {
    return new Object();
  }

  addValidator(type, name, fn) {
    Validator.fn[type].set(name, fn);
    return new Validator();
  }
}
