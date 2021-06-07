export const TOGGLE_MENU = 'TOGGLE_MENU';

export const reducerFunc = (prevState, action) => {
  let state;

  switch (action.type) {
    case TOGGLE_MENU:
      state = {
        ...prevState,
        isOpen: !prevState.isOpen,
      };

      return state;
    default:
      return state;
  }
};
