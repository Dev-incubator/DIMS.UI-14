import FETCH_USERS from '../actions/fetchUsers';
import HIDE_LOADER from '../actions/hideLoader';
import SHOW_LOADER from '../actions/showLoader';
import { getAllElementsFromCollection, USERS } from '../../utilities/fb-helpers';

const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });
    const usersList = await getAllElementsFromCollection(USERS);
    dispatch({ type: FETCH_USERS, payload: usersList });
    dispatch({ type: HIDE_LOADER });
  } catch (error) {
    console.log('An error occured while fetching/dispatch users', error);
  }
};

export default fetchUsers;
