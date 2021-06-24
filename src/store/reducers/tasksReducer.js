import initialState from '../initialStore';
import FETCH_TASKS from '../actions/fetchTasks';

const tasksReducer = (prevState = initialState.tasks, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...prevState, tasksList: action.payload };
    default:
      return prevState;
  }
};

export default tasksReducer;
