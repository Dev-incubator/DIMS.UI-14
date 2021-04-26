import {
  regExpNamesCheck,
  regExpEmailCheck,
  regExpPasswordCheck,
  regExpDateOfBirthCheck,
  regExpPhoneCheck,
  regExpScoreCheck,
} from './regExp-helpers';

export function validateInput(inputName, inputBody, password = '') {
  let validatorField;
  let errorField;

  switch (inputName) {
    case 'username':
      validatorField = regExpNamesCheck(inputBody);
      errorField = validatorField ? '' : 'This field must contain at least 2 letters';
      break;
    case 'surname':
      validatorField = regExpNamesCheck(inputBody);
      errorField = validatorField ? '' : 'This field must contain at least 2 letters';
      break;
    case 'email':
      validatorField = regExpEmailCheck(inputBody);
      errorField = validatorField ? '' : 'The entered email is incorrect';
      break;
    case 'direction':
      validatorField = Boolean(inputBody);
      errorField = validatorField ? '' : 'This field is required';
      break;
    case 'role':
      validatorField = Boolean(inputBody);
      errorField = validatorField ? '' : 'This field is required';
      break;
    case 'password':
      validatorField = regExpPasswordCheck(inputBody);
      errorField = validatorField
        ? ''
        : 'Password must contain at least 8 characters, incl. at least 1 uppercase and lowercase letters, 1 number and 1 special character';
      break;
    case 'passwordRepeat':
      validatorField = inputBody === password;
      errorField = validatorField ? '' : "Passwords don't match";
      break;
    case 'dateOfBirth':
      validatorField = regExpDateOfBirthCheck(inputBody);
      errorField = validatorField ? '' : 'User must be over 18 years old';
      break;
    case 'phone':
      validatorField = regExpPhoneCheck(inputBody);
      errorField = validatorField ? '' : 'The entered phone is incorrect';
      break;
    case 'skype':
      validatorField = Boolean(inputBody);
      errorField = validatorField ? '' : 'This field is required';
      break;
    case 'startDate':
      validatorField = Boolean(inputBody);
      errorField = validatorField ? '' : 'This field is required';
      break;
    case 'education':
      validatorField = Boolean(inputBody);
      errorField = validatorField ? '' : 'This field is required';
      break;
    case 'averageScore':
      validatorField = regExpScoreCheck(inputBody);
      errorField = validatorField ? '' : 'The entered number is incorrect';
      break;
    case 'mathScore':
      validatorField = regExpScoreCheck(inputBody);
      errorField = validatorField ? '' : 'The entered number is incorrect';
      break;
    default:
      break;
  }

  return { name: inputName, validity: validatorField, errorMsg: errorField };
}

export function checkAllFormValidity(validator) {
  return !Object.values(validator).includes(false);
}
