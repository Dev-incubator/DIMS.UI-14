export const getLowerCasedStr = (str) => str.toLowerCase();
export const getTrimmedStr = (str) => str.trim();

export const findChangedField = (prevObj, newObj) => {
  const prevObjEntries = Object.entries(prevObj);
  const newObjEntries = Object.entries(newObj);

  return newObjEntries.find((field, index) => field[1] !== prevObjEntries[index][1]);
};

export const checkIfOneOfFieldsChanged = (prevObj, newObj) => {
  const prevObjEntries = Object.entries(prevObj);
  const newObjEntries = Object.entries(newObj);

  return !!newObjEntries.find((field, index) => field[1] !== prevObjEntries[index][1]);
};
