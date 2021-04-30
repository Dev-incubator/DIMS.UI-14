export const TOGGLE_MENU = 'toggle-menu';

export const reducerFunc = (prevState, action) => {
  let state;

  switch (action.type) {
    case TOGGLE_MENU:
      state = {
        ...prevState,
        settings: {
          ...prevState.settings,
          menu: {
            isOpen: !prevState.settings.menu.isOpen,
          },
        },
      };

      return state;
    default:
      return state;
  }
};
