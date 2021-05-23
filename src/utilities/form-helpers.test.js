import { getLowerCasedAndTrimmedStr } from './form-helpers';

test('[getLowerCasedAndTrimmedStr] - aliaksandr.razumny@gmail.com should be returned', () => {
  const input = ' Aliaksandr.Razumny@gmail.com   ';
  const actual = getLowerCasedAndTrimmedStr(input);
  const expected = 'aliaksandr.razumny@gmail.com';
  expect(actual).toBe(expected);
});

test('[getLowerCasedAndTrimmedStr] - false should be returned', () => {
  const input = ' Aliaksandr.Razumny@gmail.com   ';
  const actual = getLowerCasedAndTrimmedStr(input);
  const expected = 'Aliaksandr.Razumny@gmail.com   ';
  expect(actual).not.toBe(expected);
});
