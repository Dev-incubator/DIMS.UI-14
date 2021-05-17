// only for export
export const TRACK_MODAL_DELETE_TRACK = 'TRACK_MODAL_DELETE_TRACK';
export const TRACK_MODAL_EDIT_TRACK = 'TRACK_MODAL_EDIT_TRACK';

// export for local use
export const TRACK_MODAL_TOGGLE = 'TRACK_MODAL_TOGGLE';

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
