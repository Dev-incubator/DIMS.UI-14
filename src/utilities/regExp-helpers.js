export const regExpNames = /[a-z]{2,}/i;
export const regExpEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/i;
export const regExpPassword = /(?=.*[0-9])(?=.*[-_!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_-]{8,}/;
export const regExpPhone = /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
export const regExpScore = /^\d{1}(\.\d{1})?$/;

export const regExpCheck = (regExp, str) => {
  return regExp.test(str);
};

export const regExpDateOfBirthCheck = (str) => {
  const currentYear = new Date().getFullYear();

  return currentYear - new Date(str).getFullYear() >= 18;
};

export const regExpDeadLineCheck = (baseDate, dateToCompare) => {
  return new Date(dateToCompare) > new Date(baseDate);
};
