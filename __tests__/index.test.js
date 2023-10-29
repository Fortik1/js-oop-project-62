import { test, expect } from '@jest/globals';
import Validator from '../src/app.js';

const schema = new Validator();

test('checkValidString', () => {
  expect(schema.string().isValid('')).toBeTruthy();
  expect(schema.string().isValid(null)).toBe(true);
  expect(schema.string().isValid(undefined)).toBeTruthy();
});

test('checkValidStringRequired', () => {
  expect(!schema.string().required().isValid('')).toBe(true);
  expect(schema.string().required().isValid()).toBeFalsy();
  expect(schema.string().required().isValid(undefined)).toBeFalsy();
  expect(!schema.string().required().isValid(null)).toBe(true);
  expect(schema.string().required().isValid('str')).toBeTruthy();
  expect(schema.string().required().isValid('is valid string')).toBeTruthy();
});

test('checkValidStringContains', () => {
  const expected1 = schema.string().contains('World').isValid('Hello, World!');
  const expected2 = schema.string().contains('Hello').isValid('Hello, World!');
  const expected3 = schema.string().contains('').isValid('Hello, World!');
  const expected4 = schema.string().contains().isValid('Hello, World!');

  expect(expected1).toBeTruthy();
  expect(expected2).toBeTruthy();
  expect(expected3).toBeTruthy();
  expect(expected4).toBeTruthy();

  expect(schema.string().contains('Hello, World!').isValid('Fail')).toBeFalsy();
  expect(schema.string().contains('Hello, World!').isValid('Hello')).toBeFalsy();
  expect(!schema.string().contains('Hello, World!').isValid('')).toBe(true);
  expect(!schema.string().contains('Hello, World!').isValid(null)).toBeTruthy();
});

test('checkMinLength', () => {

  expect(schema.string().minLength(5).isValid('fail')).toBeFalsy();
  expect(schema.string().minLength(5).isValid('')).toBeFalsy();
  expect(schema.string().minLength(5).isValid()).toBeFalsy();

  expect(schema.string().minLength().isValid('TestSucces')).toBeTruthy();
});

test('checkDefaul', () => {
  expect(schema.number().isValid(5)).toBeTruthy();
  expect(schema.number().isValid(NaN)).toBeTruthy();
  expect(schema.number().isValid(null)).toBeTruthy();
  expect(schema.number().isValid()).toBeTruthy();
});

test('checkRequiredNumber', () => {
  expect(schema.number().required().isValid(1)).toBeTruthy();
  expect(schema.number().required().isValid(2)).toBeTruthy();

  expect(schema.number().required().isValid(-2)).toBeFalsy();
  expect(schema.number().required().isValid(null)).toBeFalsy();
  expect(schema.number().required().isValid()).toBeFalsy();
  expect(schema.number().required().isValid('')).toBeFalsy();
});

test('checkPositiveNumber', () => {
  expect(schema.number().positive().isValid(10)).toBeTruthy();

  expect(schema.number().positive().isValid(-10)).toBeFalsy();
  expect(schema.number().positive().isValid(0)).toBeFalsy();
});

test('checkRangeNumber', () => {
  expect(schema.number().range(-5, 2).isValid(0)).toBeTruthy();
  expect(schema.number().range(-5, 2).isValid(-2)).toBeTruthy();
  expect(schema.number().range(-5, 2).isValid(2)).toBeTruthy();

  expect(schema.number().range(-5, 2).isValid(-6)).toBeFalsy();
  expect(schema.number().range(-5, 2).isValid(3)).toBeFalsy();
});

test('isArrayDefault', () => {
  expect(schema.array().isValid(null)).toBeTruthy();
  expect(schema.array().isValid()).toBeTruthy();
  expect(schema.array().isValid([])).toBeTruthy();
});

test('checkRequiredArray', () => {
  expect(schema.array().required().isValid([])).toBeTruthy();
  expect(schema.array().required().isValid(['true'])).toBeTruthy();

  expect(schema.array().required().isValid()).toBeFalsy();
});

test('checkSizeArray', () => {
  expect(schema.array().sizeof(2).isValid(['', ''])).toBeTruthy();
  expect(schema.array().sizeof().isValid([''])).toBeFalsy();
  expect(schema.array().sizeof(2).isValid([''])).toBeFalsy();
  expect(schema.array().sizeof(2).isValid()).toBeFalsy();
});

test('checkObjectValid', () => {
  const object = schema.object();

  object.shape({
    name: schema.string().required(),
    age: schema.number().positive(),
  });

  expect(object.isValid({ name: 'kolya', age: 20 })).toBeTruthy();
  expect(object.isValid({ name: 'kolya', age: null })).toBeTruthy();

  expect(object.isValid({ name: '', age: null })).toBeFalsy();
  expect(object.isValid({ name: 'kolya', age: -5 })).toBeFalsy();
});

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
});
