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
