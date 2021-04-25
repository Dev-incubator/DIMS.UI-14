import { USER_MODAL, TASK_MODAL, USERS_MODAL, DELETE_USER, DELETE_TASK } from './action-сreators';

export default function reducerFunc(prevState, action) {
  let state = {};
  switch (action.type) {
    case USER_MODAL:
    case TASK_MODAL:
    case USERS_MODAL:
      state = {
        ...prevState,
        isOpen: !prevState.isOpen,
        selectedModal: action.modalType,
      };
      return state;
    case DELETE_USER:
      state = {
        ...prevState,
        usersList: prevState.usersList.filter((item) => item.id !== action.selectedID),
      };
      return state;
    case DELETE_TASK:
      state = {
        ...prevState,
        tasksList: prevState.tasksList.filter((item) => item.id !== action.selectedID),
      };
      return state;
    default:
      return prevState;
  }
}
