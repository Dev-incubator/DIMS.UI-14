import initialState from '../initialStore';
import TOGGLE_MODAL from '../actions/toggleModal';
import SHOW_LOADER from '../actions/showLoader';
import HIDE_LOADER from '../actions/hideLoader';

const appReducer = (prevState = initialState.app, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...prevState, loading: true };
    case HIDE_LOADER:
      return { ...prevState, loading: false };
    case TOGGLE_MODAL:
      return { ...prevState, isModalOpen: !prevState.isModalOpen, selectedModal: action.payload };
    default:
      return prevState;
  }
};

export default appReducer;
