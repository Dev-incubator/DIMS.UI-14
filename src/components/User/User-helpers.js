// only for export
export const USER_MODAL_DELETE_USER = 'modal-user-delete';
export const USER_MODAL_EDIT_USER = 'modal-user-edit';
export const USER_MODAL_SHOW_USER = 'modal-user-show';

// export for local use
export const USER_MODAL_TOGGLE = 'modal-user';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case USER_MODAL_TOGGLE:
      state = {
        ...prevState,
        isOpen: !prevState.isOpen,
        selectedModal: action.modalType,
      };

      return state;
    default:
      return prevState;
  }
};
