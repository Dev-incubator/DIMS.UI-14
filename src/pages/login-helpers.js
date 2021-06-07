import { validateInput, checkAllFormValidity } from '../utilities/form-validators';

export const LOGIN_ONCHANGE = 'LOGIN_ONCHANGE';
export const LOGIN_VALIDATE_FIELDS = 'LOGIN_VALIDATE_FIELDS';
export const LOGIN_VALIDATE_FORM = 'LOGIN_VALIDATE_FORM';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_PASS = 'LOGIN_PASS';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case LOGIN_ONCHANGE:
      state = {
        ...prevState,
        loginError: '',
        data: {
          ...prevState.data,
          [action.name]: action.value,
        },
      };

      return state;
    case LOGIN_VALIDATE_FIELDS:
      if (action.fieldName in prevState.validator) {
        const { name, validity, errorMsg } = validateInput(action.fieldName, action.fieldValue);
        state = {
          ...prevState,
          validator: {
            ...prevState.validator,
            [name]: validity,
          },
          errors: {
            ...prevState.errors,
            [`${name}Error`]: errorMsg,
          },
        };

        return state;
      }

      return prevState;
    case LOGIN_VALIDATE_FORM:
      state = {
        ...prevState,
        isValid: checkAllFormValidity(prevState.validator),
      };

      return state;
    case LOGIN_FAIL:
      switch (action.error.code) {
        case 'auth/user-not-found':
          state = {
            ...action.initState,
            loginError: 'Error! The user is not registered.',
          };

          return state;
        case 'auth/wrong-password':
          state = {
            ...action.initState,
            data: {
              ...action.initState.data,
              email: prevState.data.email,
            },
            validator: {
              ...action.initState.validator,
              email: prevState.validator.email,
            },
            loginError: 'Error! The password is invalid.',
          };

          return state;
        default:
          state = {
            ...action.initState,
            loginError: 'Error! Something went wrong.',
          };

          return state;
      }
    default:
      return prevState;
  }
};
