import String from './utilit/string.js';
import Number from './utilit/number.js';
import CheckArray from './utilit/array.js';
import Object from './utilit/object.js';

export default class Validator {
  constructor() {
    this.fn = {
      string: new Map(),
      array: new Map(),
      number: new Map(),
      object: new Map(),
    };
  }

  string() {
    return new String(this.fn);
  }

  number() {
    return new Number(this.fn);
  }

  array() {
    return new CheckArray(this.fn);
  }

  object() {
    return new Object(this.fn);
  }

  addValidator(type, name, fn) {
    this.fn[type].set(name, fn);
    return this;
  }
}
