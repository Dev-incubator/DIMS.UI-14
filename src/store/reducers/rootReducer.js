import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import appReducer from './appReducer';
import usersReducer from './usersReducer';
import tasksReducer from './tasksReducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  app: appReducer,
  users: usersReducer,
  tasks: tasksReducer,
});

export default rootReducer;
