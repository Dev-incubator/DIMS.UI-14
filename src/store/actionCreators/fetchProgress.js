import FETCH_PROGRESS from '../actions/fetchProgress';
import TOGGLE_LOADER from '../actions/toggleLoader';
import { USERS, getElementDataFromCollection, getAllTracksFromAllTasks } from '../../utilities/fb-helpers';

const fetchProgress = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_LOADER });
      const userData = await getElementDataFromCollection(USERS, userId);
      const userFullName = `${userData.username} ${userData.surname}`;
      const allTracks = await getAllTracksFromAllTasks(userData.tasks);
      dispatch({ type: FETCH_PROGRESS, payload: { userFullName, allTracks } });
      dispatch({ type: TOGGLE_LOADER });
    } catch (error) {
      console.log('An error occured while fetching/dispatch progress', error);
    }
  };
};

export default fetchProgress;
