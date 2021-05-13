import { internationalizeDate } from './internationalization';

test('[internationalizeDate] - true should be returned', () => {
  const input = '1996-04-05';
  const actual = internationalizeDate(input);
  const expected = '05.04.1996';
  expect(actual).toBe(expected);
});

test('[internationalizeDate] - false should be returned', () => {
  const input = '1996-04-05';
  const actual = internationalizeDate(input);
  const expected = '1996-04-05';
  expect(actual).not.toBe(expected);
});
