// only for export
export const TASK_MODAL_DELETE_TASK = 'modal-task-delete';
export const TASK_MODAL_SHOW_TASK = 'modal-task-show';
export const TASK_MODAL_EDIT_TASK = 'modal-task-edit';

// export for local use
export const TASK_MODAL_TOGGLE = 'modal-task';

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
