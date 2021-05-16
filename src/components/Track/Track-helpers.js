// only for export
export const TRACK_MODAL_DELETE_TRACK = 'modal-track-delete';
export const TRACK_MODAL_EDIT_TRACK = 'modal-track-edit';

// export for local use
export const TRACK_MODAL_TOGGLE = 'modal-track';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case TRACK_MODAL_TOGGLE:
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
