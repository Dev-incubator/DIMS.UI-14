// only for export
export const USER_MODAL_DELETE_USER = 'USER_MODAL_DELETE_USER';
export const USER_MODAL_EDIT_USER = 'USER_MODAL_EDIT_USER';
export const USER_MODAL_SHOW_USER = 'USER_MODAL_SHOW_USER';

// export for local use
export const USER_MODAL_TOGGLE = 'USER_MODAL_TOGGLE';

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
