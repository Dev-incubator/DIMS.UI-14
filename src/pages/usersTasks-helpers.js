// export for local use
export const TASKS_STATUS_UPDATE = 'TASKS_STATUS_UPDATE';
export const TASKS_SET_DATA = 'TASKS_SET_DATA';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case TASKS_STATUS_UPDATE:
      state = {
        ...prevState,
        tasksWithStatus: action.list,
      };

      return state;
    case TASKS_SET_DATA:
      state = {
        ...prevState,
        userName: action.userName,
        tasksWithStatus: action.tasksWithStatus,
        tasksList: action.tasksList,
        userId: action.userId,
        isUser: action.role === 'User',
      };

      return state;
    default:
      return state;
  }
};
