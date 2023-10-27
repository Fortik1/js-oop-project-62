import { test, expect } from '@jest/globals';
import Validator from '../src/app';

const schema = new Validator();

test('checkValidString', () => {
  const checkString = schema.string();

  expect(checkString.isValid('')).toBeTruthy();
  expect(checkString.isValid(null)).toBeTruthy();
  expect(checkString.isValid(undefined)).toBeTruthy();
});

test('checkValidStringRequired', () => {
  const checkRequired = schema.string().required();

  expect(checkRequired.isValid('')).toBeFalsy();
  expect(checkRequired.isValid(undefined)).toBeFalsy();
  expect(checkRequired.isValid(null)).toBeFalsy();
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
})

test('checkMinLength', () => {
  const check = schema.string().minLength(5);

  expect(check.isValid('fail')).toBeFalsy();
  expect(check.isValid('')).toBeFalsy();
  expect(check.isValid()).toBeFalsy();

  const defaultLength = schema.string().minLength();

  expect(defaultLength.isValid('TestSucces')).toBeTruthy();
})
