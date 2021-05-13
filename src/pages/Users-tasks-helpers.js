// export for local use
export const STATUS_UPDATE = 'tasks-update';
export const SET_DATA = 'tasks-set-data';

export const reducerFunc = (prevState, action) => {
  let state;
  switch (action.type) {
    case STATUS_UPDATE:
      state = {
        ...prevState,
        tasksWithStatus: action.list,
      };

      return state;
    case SET_DATA:
      state = {
        ...prevState,
        userName: action.userName,
        tasksWithStatus: action.tasksWithStatus,
        tasksList: action.tasksList,
        userID: action.userID,
        isUser: action.role === 'User',
      };

      return state;
    default:
      return state;
  }
};
