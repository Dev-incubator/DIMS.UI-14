// only for export
export const USERS_MODAL_CREATE_USER = 'modal-users-create';

// export for local use
export const USERS_DELETE_USER = 'users-delete-user';
export const USERS_MODAL_TOGGLE = 'users-modal-toggle';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case USERS_DELETE_USER:
      state = {
        ...prevState,
        usersList: prevState.usersList.filter((item) => item.id !== action.selectedID),
      };

      return state;
    case USERS_MODAL_TOGGLE:
      state = {
        ...prevState,
        isOpen: !prevState.isOpen,
        selectedModal: action.modalType,
      };

      return state;
    default:
      return state;
  }
};
