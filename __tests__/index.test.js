import { test, expect } from "@jest/globals";
import Validator from "../src/app";

const schema = new Validator();

test('checkValidString', () => {
  const checkString = schema.string();

  expect(checkString.isValid('')).toBeTruthy();
  expect(checkString.isValid(null)).toBeTruthy();
  expect(checkString.isValid(undefined)).toBeTruthy();
})

test('checkValidStringRequired', () => {
  const checkRequired = schema.string().required();

  expect(checkRequired.isValid('')).toBeFalsy();
  expect(checkRequired.isValid(undefined)).toBeFalsy();
  expect(checkRequired.isValid(null)).toBeFalsy();
  expect(checkRequired.isValid('str')).toBeTruthy();
  expect(checkRequired.isValid('is valid string')).toBeTruthy();
})
