// only for export
export const TASK_MODAL_DELETE_TASK = 'TASK_MODAL_DELETE_TASK';
export const TASK_MODAL_SHOW_TASK = 'TASK_MODAL_SHOW_TASK';
export const TASK_MODAL_EDIT_TASK = 'TASK_MODAL_EDIT_TASK';

// export for local use
export const TASK_MODAL_TOGGLE = 'TASK_MODAL_TOGGLE';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case TASK_MODAL_TOGGLE:
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
