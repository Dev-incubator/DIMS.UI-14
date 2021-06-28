import { useState, useEffect, useRef } from 'react';
import { checkAllFormValidity, validateInput } from '../../utilities/form-validators';

export const useInput = (initialState) => {
  // why lazy loading doesn't work or why it's recreates every render?
  const [state, setState] = useState(() => initialState);

  const onChange = ({ target: { name, value } }) =>
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  console.log(state);

  return {
    state,
    onChange,
  };
};

export const useValidator = (initialState, password = '', startDate = '', ...trackedFields) => {
  const [validator, setValidator] = useState(() => initialState);
  const [errors, setErrors] = useState(() => {
    return Object.keys(initialState).reduce((result, key) => {
      const errorKey = `${key}Error`;

      return { ...result, [errorKey]: '' };
    }, {});
  });
  const [isValid, setIsValid] = useState(() => false);
  const prevTrackedFieldsRef = useRef(trackedFields);
  const firstRender = useRef(true);

  useEffect(() => {
    const changedField = trackedFields.find((field, index) => field[1] !== prevTrackedFieldsRef.current[index][1]);

    if (changedField) {
      const [fieldName, fieldValue] = changedField;
      const { name, validity, errorMsg } = validateInput(fieldName, fieldValue, password, startDate);

      setValidator((prevValidator) => ({
        ...prevValidator,
        [name]: validity,
      }));

      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${name}Error`]: errorMsg,
      }));

      prevTrackedFieldsRef.current = trackedFields;
    }
    // Previous validator & errors (actual will be after useEffect's called render).
    console.log(validator);
    console.log(errors);
  }, [...Object.values(Object.fromEntries(trackedFields))]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      return;
    }
    setIsValid(checkAllFormValidity(validator));
    // Previous isValid (actual will be after useEffect's called render).
    console.log(isValid);
    // Makes 2 renders first time on Create Modals (changes both firstRender.current & validator)
  }, [...Object.values(validator), firstRender.current]);

  return {
    errors,
    isValid,
  };
};

export const TASK_ONCHANGE = 'TASK_ONCHANGE';
export const TASK_VALIDATE = 'TASK_VALIDATE';

export const stateReducer = (prevState, action) => {
  switch (action.type) {
    case TASK_ONCHANGE:
      if (action.payload.type === 'checkbox') {
        if (prevState.selectedUsers.find((id) => id === action.payload.name)) {
          return {
            ...prevState,
            selectedUsers: prevState.selectedUsers.filter((id) => id !== action.payload.name),
          };
        }

        return {
          ...prevState,
          selectedUsers: prevState.selectedUsers.concat(action.payload.name),
        };
      }

      return {
        ...prevState,
        [action.payload.name]: action.payload.value,
      };
    default:
      return prevState;
  }
};

export const validatorReducer = (prevState, action) => {
  switch (action.type) {
    case TASK_VALIDATE:
      if (action.payload.event.type === 'checkbox') {
        const validity = !!action.payload.state.selectedUsers.length;
        const errorMsg = validity ? '' : 'At least one user must be selected';

        return {
          ...prevState,
          validator: {
            ...prevState.validator,
            selectedUsers: validity,
          },
          errors: {
            ...prevState.errors,
            selectedUsersError: errorMsg,
          },
        };
      }
      if (action.payload.event.name in prevState.validator) {
        const { name, validity, errorMsg } = validateInput(
          action.payload.event.name,
          action.payload.event.value,
          undefined,
          action.payload.state.startDate,
        );

        return {
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
      }

      return prevState;
    default:
      return prevState;
  }
};
