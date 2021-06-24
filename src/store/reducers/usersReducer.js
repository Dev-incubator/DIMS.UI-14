import initialState from '../initialStore';
import FETCH_USERS from '../actions/fetchUsers';

const usersReducer = (prevState = initialState.users, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...prevState, usersList: action.payload };
    default:
      return prevState;
  }
};

export default usersReducer;
