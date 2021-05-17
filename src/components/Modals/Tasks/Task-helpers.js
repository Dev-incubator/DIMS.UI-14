import { validateInput, checkAllFormValidity } from '../../../utilities/form-validators';

// export for local user
export const CREATE_TASK_ONCHANGE = 'CREATE_TASK_ONCHANGE';
export const CREATE_TASK_VALIDATE_FIELDS = 'CREATE_TASK_VALIDATE_FIELDS';
export const CREATE_TASK_VALIDATE_FORM = 'CREATE_TASK_VALIDATE_FORM';

export const EDIT_TASK_ONCHANGE = 'EDIT_TASK_ONCHANGE';
export const EDIT_TASK_VALIDATE_FIELDS = 'EDIT_TASK_VALIDATE_FIELDS';
export const EDIT_TASK_VALIDATE_FORM = 'EDIT_TASK_VALIDATE_FORM';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case CREATE_TASK_ONCHANGE:
    case EDIT_TASK_ONCHANGE:
      if (action.targetType === 'checkbox') {
        if (prevState.data.selectedUsers.find((id) => id === action.name)) {
          state = {
            ...prevState,
            data: {
              ...prevState.data,
              selectedUsers: prevState.data.selectedUsers.filter((id) => id !== action.name),
            },
          };

          return state;
        }
        const newSelectedUser = prevState.usersList.find((item) => item.id === action.name).id;
        const newSelectedUsers = prevState.data.selectedUsers.concat(newSelectedUser);
        state = {
          ...prevState,
          data: {
            ...prevState.data,
            selectedUsers: newSelectedUsers,
          },
        };

        return state;
      }
      state = {
        ...prevState,
        data: {
          ...prevState.data,
          [action.name]: action.value,
        },
      };

      return state;
    case CREATE_TASK_VALIDATE_FIELDS:
    case EDIT_TASK_VALIDATE_FIELDS:
      if (action.targetType === 'checkbox') {
        const validity = !!prevState.data.selectedUsers.length;
        const errorMsg = validity ? '' : 'At least one user must be selected';
        state = {
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

        return state;
      }

      if (action.fieldName in prevState.validator) {
        const { name, validity, errorMsg } = validateInput(
          action.fieldName,
          action.fieldValue,
          '',
          prevState.data.startDate,
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
    case CREATE_TASK_VALIDATE_FORM:
    case EDIT_TASK_VALIDATE_FORM:
      state = {
        ...prevState,
        isValid: checkAllFormValidity(prevState.validator),
      };

      return state;
    default:
      return state;
  }
};
