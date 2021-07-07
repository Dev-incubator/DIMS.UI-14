import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { checkAllFormValidity, validateInput } from '../../utilities/form-validators';
import {
  checkIfOneOfFieldsChanged,
  createErrorsStateByValidator,
  findChangedField,
} from '../../utilities/form-helpers';

export const useInput = (initialState) => {
  const [state, setState] = useState(typeof initialState === 'function' ? initialState() : initialState);

  const onChange = useCallback(
    ({ target: { name, value } }) =>
      setState((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      }),
    [],
  );

  return {
    state,
    onChange,
  };
};

export const useValidator = (initialState, { password, startDate }, trackedFields) => {
  console.log(password, startDate);
  const [validator, setValidator] = useState(typeof initialState === 'function' ? initialState() : initialState);
  const [errors, setErrors] = useState(() => createErrorsStateByValidator(validator));
  const prevTrackedFieldsRef = useRef(trackedFields);

  useEffect(() => {
    const changedField = findChangedField(prevTrackedFieldsRef.current, trackedFields);

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
  }, [trackedFields]);

  return {
    errors,
    validator,
  };
};

export const useAllSelectedFormsValidityChecker = (validator, initialState) => {
  const [isValid, setIsValid] = useState(false);
  const initialStateRef = useRef(initialState);

  const isOneOfStateFieldsChanged = useMemo(() => checkIfOneOfFieldsChanged(initialStateRef.current, initialState), [
    initialState,
  ]);
  useEffect(() => {
    if (isOneOfStateFieldsChanged) {
      setIsValid(checkAllFormValidity(validator));
    }
  }, [validator, isOneOfStateFieldsChanged]);

  return isValid;
};

export const TASK_ONCHANGE = 'TASK_ONCHANGE';
export const TASK_VALIDATE = 'TASK_VALIDATE';

export const stateReducer = (prevState, action) => {
  const {
    payload: { name, value, type },
  } = action;

  switch (action.type) {
    case TASK_ONCHANGE:
      if (type === 'checkbox') {
        const isSelectedUserExists = prevState.selectedUsers.find((id) => id === name);
        if (isSelectedUserExists) {
          return {
            ...prevState,
            selectedUsers: prevState.selectedUsers.filter((id) => id !== name),
          };
        }

        return {
          ...prevState,
          selectedUsers: prevState.selectedUsers.concat(name),
        };
      }

      return {
        ...prevState,
        [name]: value,
      };
    default:
      return prevState;
  }
};

export const validatorReducer = (prevState, action) => {
  const {
    payload: {
      state: { password, startDate, selectedUsers },
      event: { name, value, type },
    },
  } = action;
  const isFieldNameInValidator = Object.keys(prevState.validator).includes(name);

  switch (action.type) {
    case TASK_VALIDATE:
      if (type === 'checkbox') {
        const isValid = !!selectedUsers.length;
        const errorMsg = isValid ? '' : 'At least one user must be selected';

        return {
          ...prevState,
          validator: {
            ...prevState.validator,
            selectedUsers: isValid,
          },
          errors: {
            ...prevState.errors,
            selectedUsersError: errorMsg,
          },
        };
      }
      if (isFieldNameInValidator) {
        /*
         if state doesn't contain state.password or state.startDate,
          this field will be undefined, what leads to default function parameters.
        */
        const { name: eventName, validity, errorMsg } = validateInput(name, value, password, startDate);

        return {
          ...prevState,
          validator: {
            ...prevState.validator,
            [eventName]: validity,
          },
          errors: {
            ...prevState.errors,
            [`${eventName}Error`]: errorMsg,
          },
        };
      }

      return prevState;
    default:
      return prevState;
  }
};
