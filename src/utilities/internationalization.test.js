import { getInternationalDate } from './internationalization';

test('[getInternationalDate] - true should be returned', () => {
  const input = '1996-04-05';
  const actual = getInternationalDate(input);
  const expected = '05.04.1996';
  expect(actual).toBe(expected);
});

test('[getInternationalDate] - false should be returned', () => {
  const input = '1996-04-05';
  const actual = getInternationalDate(input);
  const expected = '1996-04-05';
  expect(actual).not.toBe(expected);
});
