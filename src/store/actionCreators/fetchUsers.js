import FETCH_USERS from '../actions/fetchUsers';
import TOGGLE_LOADER from '../actions/toggleLoader';
import { getAllElementsFromCollection, USERS } from '../../utilities/fb-helpers';

const fetchUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_LOADER });
      const usersList = await getAllElementsFromCollection(USERS);
      dispatch({ type: FETCH_USERS, payload: usersList });
      dispatch({ type: TOGGLE_LOADER });
    } catch (error) {
      console.log('An error occured while fetching/dispatch users', error);
    }
  };
};

export default fetchUsers;
