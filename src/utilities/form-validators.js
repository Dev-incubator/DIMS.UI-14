import {
  regExpNames,
  regExpEmail,
  regExpPassword,
  regExpPhone,
  regExpScore,
  regExpDateOfBirthCheck,
  regExpCheck,
  regExpDeadLineCheck,
} from './regExp-helpers';

export function validateInput(inputName, inputBody, password = '', startDate = '') {
  let validatorField;
  let errorField;

  switch (inputName) {
    case 'username':
    case 'title':
    case 'name':
      validatorField = regExpCheck(regExpNames, inputBody);
      errorField = validatorField ? '' : errors.minTwo;
      break;
    case 'surname':
      validatorField = regExpCheck(regExpNames, inputBody);
      errorField = validatorField ? '' : errors.minTwo;
      break;
    case 'email':
      validatorField = regExpCheck(regExpEmail, inputBody);
      errorField = validatorField ? '' : errors.email;
      break;
    case 'direction':
      validatorField = !!inputBody;
      errorField = validatorField ? '' : errors.required;
      break;
    case 'role':
      validatorField = !!inputBody;
      errorField = validatorField ? '' : errors.required;
      break;
    case 'password':
      validatorField = regExpCheck(regExpPassword, inputBody);
      errorField = validatorField ? '' : errors.passwordStrength;
      break;
    case 'passwordRepeat':
      validatorField = inputBody === password;
      errorField = validatorField ? '' : errors.passwordMatch;
      break;
    case 'dateOfBirth':
      validatorField = regExpDateOfBirthCheck(inputBody);
      errorField = validatorField ? '' : errors.yearsOld;
      break;
    case 'phone':
      validatorField = regExpCheck(regExpPhone, inputBody);
      errorField = validatorField ? '' : errors.phone;
      break;
    case 'skype':
      validatorField = !!inputBody;
      errorField = validatorField ? '' : errors.required;
      break;
    case 'startDate':
      validatorField = !!inputBody;
      errorField = validatorField ? '' : errors.required;
      break;
    case 'education':
      validatorField = !!inputBody;
      errorField = validatorField ? '' : errors.required;
      break;
    case 'averageScore':
      validatorField = regExpCheck(regExpScore, inputBody);
      errorField = validatorField ? '' : errors.score;
      break;
    case 'mathScore':
      validatorField = regExpCheck(regExpScore, inputBody);
      errorField = validatorField ? '' : errors.score;
      break;
    case 'date':
    case 'deadLine':
      validatorField = regExpDeadLineCheck(startDate, inputBody);
      errorField = validatorField ? '' : errors.deadLine;
      break;
    default:
      break;
  }

  return { name: inputName, validity: validatorField, errorMsg: errorField };
}

export function checkAllFormValidity(validator) {
  return !Object.values(validator).includes(false);
}

const errors = {
  score: 'The entered number is incorrect',
  required: 'This field is required',
  phone: 'The entered phone is incorrect',
  yearsOld: 'User must be over 18 years old',
  passwordMatch: "Passwords don't match",
  passwordStrength:
    'Password must contain at least 8 characters, incl. at least 1 uppercase and lowercase letters, 1 number and 1 special character',
  email: 'The entered email is incorrect',
  minTwo: 'This field must contain at least 2 letters',
  deadLine: "The deadLine must be later than task's start date",
  track: "The date must be later than task's start date",
};
