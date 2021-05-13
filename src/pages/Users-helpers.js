// only for export
export const USERS_MODAL_CREATE_USER = 'modal-users-create';

// export for local use
export const USERS_MODAL_TOGGLE = 'users-modal-toggle';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
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
