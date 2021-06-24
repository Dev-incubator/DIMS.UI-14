import FETCH_TASKS from '../actions/fetchTasks';
import SHOW_LOADER from '../actions/showLoader';
import HIDE_LOADER from '../actions/hideLoader';
import { getAllElementsFromCollection, TASKS } from '../../utilities/fb-helpers';

const fetchTasks = () => async (dispatch) => {
  try {
    dispatch({ type: SHOW_LOADER });
    const tasksList = await getAllElementsFromCollection(TASKS);
    dispatch({ type: FETCH_TASKS, payload: tasksList });
    dispatch({ type: HIDE_LOADER });
  } catch (error) {
    console.log('An error occured while fetching/dispatch tasks', error);
  }
};

export default fetchTasks;
