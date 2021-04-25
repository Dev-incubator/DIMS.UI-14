const regExpNames = /[a-z]{2,}/i;
const regExpEmail = /[-.\w]+@([\w-]+\.)+[\w-]+/i;
const regExpPassword = /(?=.*[0-9])(?=.*[-_!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_-]{8,}/;
const regExpPhone = /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
const regExpScore = /^\d{1}(\.\d{1})?$/;

export const regExpNamesCheck = (str) => {
  return regExpNames.test(str);
};

export const regExpEmailCheck = (str) => {
  return regExpEmail.test(str);
};

export const regExpPasswordCheck = (str) => {
  return regExpPassword.test(str);
};

export const regExpPhoneCheck = (str) => {
  return regExpPhone.test(str);
};

export const regExpScoreCheck = (str) => {
  return regExpScore.test(str);
};

export const regExpDateOfBirthCheck = (str) => {
  return new Date().getFullYear() - new Date(str).getFullYear() >= 18;
};
