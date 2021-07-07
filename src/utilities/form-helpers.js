export const getLowerCasedStr = (str) => str.toLowerCase();
export const getTrimmedStr = (str) => str.trim();

export const findChangedField = (prevObj, newObj) => {
  const prevObjEntries = Object.entries(prevObj);
  const newObjEntries = Object.entries(newObj);
  // it's a method to safe comparing two objects. [1] - it is the value.
  return newObjEntries.find((field, index) => field[1] !== prevObjEntries[index][1]);
};

export const checkIfOneOfFieldsChanged = (prevObj, newObj) => {
  const prevObjEntries = Object.entries(prevObj);
  const newObjEntries = Object.entries(newObj);

  return !!newObjEntries.find((field, index) => field[1] !== prevObjEntries[index][1]);
};

export const createErrorsStateByValidator = (validator) => {
  return Object.keys(validator).reduce((result, key) => {
    const errorKey = `${key}Error`;

    return { ...result, [errorKey]: '' };
  }, {});
};
