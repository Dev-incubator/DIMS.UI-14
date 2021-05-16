// only for export
export const TASKS_MODAL_CREATE_TASK = 'modal-tasks-create'; // not used now

// export for local use
export const TASKS_MODAL_TOGGLE = 'tasks-modal-toggle';
export const TASKS_UPDATE = 'tasks-update';

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
