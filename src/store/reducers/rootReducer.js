import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import progressReducer from './progressReducer';
import appReducer from './appReducer';
import usersReducer from './usersReducer';
import tasksReducer from './tasksReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  progress: progressReducer,
  app: appReducer,
  users: usersReducer,
  tasks: tasksReducer,
});

export default rootReducer;
