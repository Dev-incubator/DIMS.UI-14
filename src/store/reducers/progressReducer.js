import FETCH_PROGRESS from '../actions/fetchProgress';
import initialState from '../initialStore';

const progressReducer = (prevState = initialState.progress, action) => {
  switch (action.type) {
    case FETCH_PROGRESS: {
      return { ...prevState, userFullName: action.payload.userFullName, allTracks: action.payload.allTracks };
    }
    default:
      return prevState;
  }
};

export default progressReducer;
