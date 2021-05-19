import { validateInput, checkAllFormValidity } from '../utilities/form-validators';

export const LOGIN_ONCHANGE = 'LOGIN_ONCHANGE';
export const LOGIN_VALIDATE_FIELDS = 'LOGIN_VALIDATE_FIELDS';
export const LOGIN_VALIDATE_FORM = 'LOGIN_VALIDATE_FORM';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case LOGIN_ONCHANGE:
      state = {
        ...prevState,
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
    default:
      return prevState;
  }
};
