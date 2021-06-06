import initialState from '../initialStore';
import TOGGLE_LOADER from '../actions/toggleLoader';
import TOGGLE_MODAL from '../actions/toggleModal';

const appReducer = (prevState = initialState.app, action) => {
  switch (action.type) {
    case TOGGLE_LOADER:
      return { ...prevState, loading: !prevState.loading };
    case TOGGLE_MODAL:
      return { ...prevState, isModalOpen: !prevState.isModalOpen, selectedModal: action.payload };
    default:
      return prevState;
  }
};

export default appReducer;
