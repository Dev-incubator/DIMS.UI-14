// only for export
export const TRACKS_MODAL_CREATE_TRACK = 'TRACKS_MODAL_CREATE_TRACK';

// export for local use
export const TRACKS_MODAL_TOGGLE = 'TRACKS_MODAL_TOGGLE';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case TRACKS_MODAL_TOGGLE:
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
