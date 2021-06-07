import { getLowerCasedStr, getTrimmedStr } from './form-helpers';

describe('getLowerCasedStr should', () => {
  it('aliaksandr.razumny@gmail.com should be returned', () => {
    const input = 'Aliaksandr.Razumny@gmail.com';
    const actual = getLowerCasedStr(input);
    const expected = 'aliaksandr.razumny@gmail.com';
    expect(actual).toBe(expected);
  });

  it('false should be returned', () => {
    const input = 'Aliaksandr.Razumny@gmail.com';
    const actual = getLowerCasedStr(input);
    const expected = 'Aliaksandr.Razumny@gmail.com';
    expect(actual).not.toBe(expected);
  });
});

describe('getTrimmedStr should', () => {
  it('aliaksandr.razumny@gmail.com should be returned', () => {
    const input = ' aliaksandr.razumny@gmail.com   ';
    const actual = getTrimmedStr(input);
    const expected = 'aliaksandr.razumny@gmail.com';
    expect(actual).toBe(expected);
  });

  it('false should be returned', () => {
    const input = ' aliaksandr.razumny@gmail.com   ';
    const actual = getTrimmedStr(input);
    const expected = ' aliaksandr.razumny@gmail.com   ';
    expect(actual).not.toBe(expected);
  });
});
