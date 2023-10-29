import { test, expect } from '@jest/globals';
import Validator from '../src/app';

const schema = new Validator();

test('checkValidString', () => {
  const checkString = schema.string();

  expect(checkString.isValid('')).toBeTruthy();
  expect(checkString.isValid(null)).toBe(true);
  expect(checkString.isValid(undefined)).toBeTruthy();
});

test('checkValidStringRequired', () => {
  const checkRequired = schema.string().required();

  expect(!checkRequired.isValid('')).toBe(true);
  expect(checkRequired.isValid()).toBeFalsy();
  expect(checkRequired.isValid(undefined)).toBeFalsy();
  expect(!checkRequired.isValid(null)).toBe(true);
  expect(checkRequired.isValid('str')).toBeTruthy();
  expect(checkRequired.isValid('is valid string')).toBeTruthy();
});

test('checkValidStringContains', () => {
  const string = schema.string();
  const expected1 = string.contains('World').isValid('Hello, World!');
  const expected2 = string.contains('Hello').isValid('Hello, World!');
  const expected3 = string.contains('').isValid('Hello, World!');
  const expected4 = string.contains().isValid('Hello, World!');

  expect(expected1).toBeTruthy();
  expect(expected2).toBeTruthy();
  expect(expected3).toBeTruthy();
  expect(expected4).toBeTruthy();

  const containsFaild = string.contains('Hello, World!');

  expect(containsFaild.isValid('Fail')).toBeFalsy();
  expect(containsFaild.isValid('Hello')).toBeFalsy();
  expect(!containsFaild.isValid('')).toBe(true);
  expect(!containsFaild.isValid(null)).toBeTruthy();
});

test('checkMinLength', () => {
  const check = schema.string().minLength(5);

  expect(check.isValid('fail')).toBeFalsy();
  expect(check.isValid('')).toBeFalsy();
  expect(check.isValid()).toBeFalsy();

  const defaultLength = schema.string().minLength();

  expect(defaultLength.isValid('TestSucces')).toBeTruthy();
});

test('checkDefaul', () => {
  const number = schema.number();

  expect(number.isValid(5)).toBeTruthy();
  expect(number.isValid(NaN)).toBeTruthy();
  expect(number.isValid(null)).toBeTruthy();
  expect(number.isValid()).toBeTruthy();
});

test('checkRequiredNumber', () => {
  const required = schema.number().required();

  expect(required.isValid(1)).toBeTruthy();
  expect(required.isValid(2)).toBeTruthy();

  expect(required.isValid(-2)).toBeFalsy();
  expect(required.isValid(null)).toBeFalsy();
  expect(required.isValid()).toBeFalsy();
  expect(required.isValid('')).toBeFalsy();
});

test('checkPositiveNumber', () => {
  const positive = schema.number().positive();

  expect(positive.isValid(10)).toBeTruthy();

  expect(positive.isValid(-10)).toBeFalsy();
  expect(positive.isValid(0)).toBeFalsy();
});

test('checkRangeNumber', () => {
  const range = schema.number().range(-5, 2);

  expect(range.isValid(0)).toBeTruthy();
  expect(range.isValid(-2)).toBeTruthy();
  expect(range.isValid(2)).toBeTruthy();

  expect(range.isValid(-6)).toBeFalsy();
  expect(range.isValid(3)).toBeFalsy();
});

test('isArrayDefault', () => {
  const array = schema.array();

  expect(array.isValid(null)).toBeTruthy();
  expect(array.isValid()).toBeTruthy();
  expect(array.isValid([])).toBeTruthy();
})

test('checkRequiredArray', () => {
  const array = schema.array().required();

  expect(array.isValid([])).toBeTruthy();
  expect(array.isValid(['true'])).toBeTruthy();

  expect(array.isValid()).toBeFalsy();
})

test('checkSizeArray', () => {
  const array = schema.array().sizeof(2);
  const arraySizeZero = schema.array().sizeof();

  expect(arraySizeZero.isValid([''])).toBeFalsy();

  expect(array.isValid(['', ''])).toBeTruthy();

  expect(array.isValid([''])).toBeFalsy();
  expect(array.isValid()).toBeFalsy();
}) 

test('checkObjectValid', () => {
  const object = schema.object();

  object.shape({
    name: schema.string().required(),
    age: schema.number().positive(),
  })

  expect(object.isValid({ name: 'kolya', age: 20 })).toBeTruthy();
  expect(object.isValid({ name: 'kolya', age: null })).toBeTruthy();

  expect(object.isValid({ name: '', age: null })).toBeFalsy();
  expect(object.isValid({ name: 'kolya', age: -5 })).toBeFalsy();
})

test('checkAddValid', () => {
  const fnString = (value, start) => value.startsWith(start);
  const fnArr = (array, num) => array.includes(num);
  const fnNumber = (numberCheck, crat) => numberCheck % crat === 0;

  const newSchema = schema.addValidator('string', 'startsWith', fnString);
  schema.addValidator('array', 'includes', fnArr);
  schema.addValidator('number', 'crat', fnNumber);

  const check = newSchema.string().test('startsWith', 'H');
  const checkArr = newSchema.array().test('includes', 2);
  const checkNumber = newSchema.number().test('crat', 2);

  expect(check.isValid('Hexlet')).toBeTruthy();
  expect(checkArr.isValid([2])).toBeTruthy();
  expect(checkNumber.isValid(2)).toBeTruthy();

  expect(check.isValid('exlet')).toBeFalsy();
  expect(checkArr.isValid([])).toBeFalsy();
  expect(checkNumber.isValid(1)).toBeFalsy();
})
