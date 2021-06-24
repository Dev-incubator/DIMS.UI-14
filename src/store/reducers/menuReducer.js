import TOGGLE_MENU from '../actions/toggleMenu';
import initialState from '../initialStore';

const menuReducer = (prevState = initialState.menu, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return { ...prevState, isOpen: !prevState.isOpen };
    default:
      return prevState;
  }
};

export default menuReducer;
