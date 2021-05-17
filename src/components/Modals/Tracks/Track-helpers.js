import { validateInput, checkAllFormValidity } from '../../../utilities/form-validators';

// export for local user
export const CREATE_TRACK_ONCHANGE = 'CREATE_TRACK_ONCHANGE';
export const CREATE_TRACK_VALIDATE_FIELDS = 'CREATE_TRACK_VALIDATE_FIELDS';
export const CREATE_TRACK_VALIDATE_FORM = 'CREATE_TRACK_VALIDATE_FORM';

export const EDIT_TRACK_ONCHANGE = 'EDIT_TRACK_ONCHANGE';
export const EDIT_TRACK_VALIDATE_FIELDS = 'EDIT_TRACK_VALIDATE_FIELDS';
export const EDIT_TRACK_VALIDATE_FORM = 'EDIT_TRACK_VALIDATE_FORM';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case CREATE_TRACK_ONCHANGE:
    case EDIT_TRACK_ONCHANGE:
      state = {
        ...prevState,
        data: {
          ...prevState.data,
          [action.name]: action.value,
        },
      };

      return state;
    case CREATE_TRACK_VALIDATE_FIELDS:
    case EDIT_TRACK_VALIDATE_FIELDS:
      if (action.fieldName in prevState.validator) {
        const { name, validity, errorMsg } = validateInput(
          action.fieldName,
          action.fieldValue,
          '',
          prevState.startDate,
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
    case CREATE_TRACK_VALIDATE_FORM:
    case EDIT_TRACK_VALIDATE_FORM:
      state = {
        ...prevState,
        isValid: checkAllFormValidity(prevState.validator),
      };

      return state;
    default:
      return state;
  }
};
