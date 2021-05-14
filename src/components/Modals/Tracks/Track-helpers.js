import { validateInput, checkAllFormValidity } from '../../../utilities/form-validators';

// export for local user
export const CREATE_TRACK_ONCHANGE = 'create-track-onchange';
export const CREATE_TRACK_VALIDATE_FIELDS = 'create-track-validate-fields';
export const CREATE_TRACK_VALIDATE_FORM = 'create-track-validate-form';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case CREATE_TRACK_ONCHANGE:
      state = {
        ...prevState,
        data: {
          ...prevState.data,
          [action.name]: action.value,
        },
      };

      return state;
    case CREATE_TRACK_VALIDATE_FIELDS:
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
      state = {
        ...prevState,
        isValid: checkAllFormValidity(prevState.validator),
      };

      return state;
    default:
      return state;
  }
};
