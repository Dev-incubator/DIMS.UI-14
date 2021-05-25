// only for export
export const USERS_MODAL_CREATE_USER = 'USERS_MODAL_CREATE_USER';

// export for local use
export const USERS_MODAL_TOGGLE = 'USERS_MODAL_TOGGLE';
export const USERS_UPDATE = 'USERS_UPDATE';

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
    case USERS_UPDATE:
      state = {
        ...prevState,
        usersList: action.usersList,
      };

      return state;
    default:
      return state;
  }
};
