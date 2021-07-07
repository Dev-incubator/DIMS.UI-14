import {
  getLowerCasedStr,
  getTrimmedStr,
  findChangedField,
  checkIfOneOfFieldsChanged,
  createErrorsStateByValidator,
} from './form-helpers';

describe('getLowerCasedStr should', () => {
  it('return aliaksandr.razumny@gmail.com', () => {
    const input = 'Aliaksandr.Razumny@gmail.com';
    const actual = getLowerCasedStr(input);
    const expected = 'aliaksandr.razumny@gmail.com';
    expect(actual).toBe(expected);
  });

  it('return false', () => {
    const input = 'Aliaksandr.Razumny@gmail.com';
    const actual = getLowerCasedStr(input);
    const expected = 'Aliaksandr.Razumny@gmail.com';
    expect(actual).not.toBe(expected);
  });
});

describe('getTrimmedStr should', () => {
  it('return aliaksandr.razumny@gmail.com', () => {
    const input = ' aliaksandr.razumny@gmail.com   ';
    const actual = getTrimmedStr(input);
    const expected = 'aliaksandr.razumny@gmail.com';
    expect(actual).toBe(expected);
  });

  it('return false', () => {
    const input = ' aliaksandr.razumny@gmail.com   ';
    const actual = getTrimmedStr(input);
    const expected = ' aliaksandr.razumny@gmail.com   ';
    expect(actual).not.toBe(expected);
  });
});

describe('findChangedField should', () => {
  it("return ['surname', 'Baidens']", () => {
    const prevState = {
      name: 'Joe',
      surname: 'Baiden',
      age: 67,
    };
    const newState = {
      name: 'Joe',
      surname: 'Baidens',
      age: 67,
    };
    const actual = findChangedField(prevState, newState);
    const expected = ['surname', 'Baidens'];
    expect(actual).toStrictEqual(expected);
  });
  it('return undefined', () => {
    const prevState = {
      name: 'Joe',
      surname: 'Baiden',
      age: 67,
    };
    const newState = {
      name: 'Joe',
      surname: 'Baiden',
      age: 67,
    };
    const actual = findChangedField(prevState, newState);
    const expected = undefined;
    expect(actual).toBe(expected);
  });
});

describe('checkIfOneOfFieldsChanged should', () => {
  it('return false', () => {
    const prevState = {
      name: 'Joe',
      date: '2021-07-05',
    };
    const newState = {
      name: 'Joe',
      date: '2021-07-05',
    };
    const actual = checkIfOneOfFieldsChanged(prevState, newState);
    const expected = false;
    expect(actual).toBe(expected);
  });
  it('return true', () => {
    const prevState = {
      name: 'Joe',
      date: '2021-07-06',
    };
    const newState = {
      name: 'Joe',
      date: '2021-07-07',
    };
    const actual = checkIfOneOfFieldsChanged(prevState, newState);
    const expected = true;
    expect(actual).toBe(expected);
  });
});

describe('createErrorsStateByValidator should', () => {
  it('return correct state', () => {
    const validator = {
      name: false,
      date: false,
    };
    const actual = createErrorsStateByValidator(validator);
    const expected = {
      nameError: '',
      dateError: '',
    };
    expect(actual).toStrictEqual(expected);
  });
  it('return incorrect state', () => {
    const validator = {
      name: false,
      date: false,
    };
    const actual = createErrorsStateByValidator(validator);
    const expected = {
      name: '',
      date: '',
    };
    expect(actual).not.toStrictEqual(expected);
  });
});
