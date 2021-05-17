import { validateInput, checkAllFormValidity } from '../../../utilities/form-validators';

// export for local use
export const CREATE_USER_ONCHANGE = 'CREATE_USER_ONCHANGE';
export const CREATE_USER_VALIDATE_FIELDS = 'CREATE_USER_VALIDATE_FIELDS';
export const CREATE_USER_VALIDATE_FORM = 'CREATE_USER_VALIDATE_FORM';

export const EDIT_USER_ONCHANGE = 'EDIT_USER_ONCHANGE';
export const EDIT_USER_VALIDATE_FIELDS = 'EDIT_USER_VALIDATE_FIELDS';
export const EDIT_USER_VALIDATE_FORM = 'EDIT_USER_VALIDATE_FORM';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case CREATE_USER_ONCHANGE:
    case EDIT_USER_ONCHANGE:
      state = {
        ...prevState,
        data: {
          ...prevState.data,
          [action.name]: action.value,
        },
      };

      return state;
    case CREATE_USER_VALIDATE_FIELDS:
    case EDIT_USER_VALIDATE_FIELDS:
      if (action.fieldName in prevState.validator) {
        const { name, validity, errorMsg } = validateInput(
          action.fieldName,
          action.fieldValue,
          prevState.data.password,
        );
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
    case CREATE_USER_VALIDATE_FORM:
    case EDIT_USER_VALIDATE_FORM:
      state = {
        ...prevState,
        isValid: checkAllFormValidity(prevState.validator),
      };

      return state;
    default:
      return state;
  }
};
