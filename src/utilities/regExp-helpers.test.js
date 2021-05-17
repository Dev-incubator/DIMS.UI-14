import {
  regExpNames,
  regExpEmail,
  regExpPassword,
  regExpPhone,
  regExpCheck,
  regExpScore,
  regExpDateOfBirthCheck,
  regExpDeadLineCheck,
} from './regExp-helpers';

// Name
test('[regExpCheck, regExpNames] - true should be returned', () => {
  const input = 'Alex';
  const actual = regExpCheck(regExpNames, input);
  const expected = true;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpNames] - false should be returned', () => {
  const input = 'A';
  const actual = regExpCheck(regExpNames, input);
  const expected = false;
  expect(actual).toBe(expected);
});

// Email
test('[regExpCheck, regExpEmail] - true should be returned', () => {
  const input = 'alexcrossby@mail.ru';
  const actual = regExpCheck(regExpEmail, input);
  const expected = true;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpEmail] - false should be returned', () => {
  const input = 'alexcro@.by';
  const actual = regExpCheck(regExpEmail, input);
  const expected = false;
  expect(actual).toBe(expected);
});

// Password
test('[regExpCheck, regExpPassword - true should be returned', () => {
  const input = '!!!Apple2021';
  const actual = regExpCheck(regExpPassword, input);
  const expected = true;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpPassword - false should be returned', () => {
  const input = 'lolkek';
  const actual = regExpCheck(regExpPassword, input);
  const expected = false;
  expect(actual).toBe(expected);
});

// Phone
test('[regExpCheck, regExpPhone - true should be returned', () => {
  const input = '+375295555555';
  const actual = regExpCheck(regExpPhone, input);
  const expected = true;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpPhone - false should be returned', () => {
  const input = '+888445555555';
  const actual = regExpCheck(regExpPhone, input);
  const expected = false;
  expect(actual).toBe(expected);
});

// Score
test('[regExpCheck, regExpScore - true should be returned', () => {
  const input = '8';
  const actual = regExpCheck(regExpScore, input);
  const expected = true;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpScore - true should be returned', () => {
  const input = '8.8';
  const actual = regExpCheck(regExpScore, input);
  const expected = true;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpScore - false should be returned', () => {
  const input = '88';
  const actual = regExpCheck(regExpScore, input);
  const expected = false;
  expect(actual).toBe(expected);
});

// Date
test('[regExpCheck, regExpDateOfBirthCheck - true should be returned', () => {
  const input = '05-04-1996';
  const actual = regExpDateOfBirthCheck(input);
  const expected = true;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpDateOfBirthCheck - false should be returned', () => {
  const input = '05-04-2010';
  const actual = regExpDateOfBirthCheck(input);
  const expected = false;
  expect(actual).toBe(expected);
});

test('[regExpCheck, regExpDeadLineCheck - true should be returned', () => {
  const baseDate = '05-04-2010';
  const dateToCompare = '06-04-2010';
  const actual = regExpDeadLineCheck(baseDate, dateToCompare);
  expect(actual).toBe(true);
});

test('[regExpCheck, regExpDeadLineCheck - false should be returned', () => {
  const baseDate = '05-04-2010';
  const dateToCompare = '03-04-2010';
  const actual = regExpDeadLineCheck(baseDate, dateToCompare);
  expect(actual).toBe(false);
});
