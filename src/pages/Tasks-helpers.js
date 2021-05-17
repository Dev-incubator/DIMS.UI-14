// only for export
export const TASKS_MODAL_CREATE_TASK = 'TASKS_MODAL_CREATE_TASK'; // not used now

// export for local use
export const TASKS_MODAL_TOGGLE = 'TASKS_MODAL_TOGGLE';
export const TASKS_UPDATE = 'TASKS_UPDATE';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case TASKS_MODAL_TOGGLE:
      state = {
        ...prevState,
        isOpen: !prevState.isOpen,
        selectedModal: action.modalType,
      };

      return state;
    case TASKS_UPDATE:
      state = {
        ...prevState,
        [action.name]: action.list,
      };

      return state;
    default:
      return state;
  }
};
