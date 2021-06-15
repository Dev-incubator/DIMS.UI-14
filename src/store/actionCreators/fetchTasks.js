import FETCH_TASKS from '../actions/fetchTasks';
import TOGGLE_LOADER from '../actions/toggleLoader';
import { getAllElementsFromCollection, TASKS } from '../../utilities/fb-helpers';

const fetchTasks = () => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_LOADER });
    const tasksList = await getAllElementsFromCollection(TASKS);
    dispatch({ type: FETCH_TASKS, payload: tasksList });
    dispatch({ type: TOGGLE_LOADER });
  } catch (error) {
    console.log('An error occured while fetching/dispatch tasks', error);
  }
};

export default fetchTasks;
