// App.jsx
export const TOGGLE_MENU = 'toggle-menu'; // +
export const toggleMenuAC = () => ({ type: TOGGLE_MENU }); // +

// Common
export const CLOSE_MODAL = 'modal';
export const closeAnyModal = () => ({ type: CLOSE_MODAL, modalType: '' });

//  Users.jsx
export const USERS_MODAL = 'modal-users';
export const CREATE_USER_MODAL = 'modal-users-create'; //  Modal.jsx
export const openCreateUserModal = () => ({ type: USERS_MODAL, modalType: CREATE_USER_MODAL });
export const DELETE_USER = 'users-delete';
export const deleteUser = (id = '') => ({ type: DELETE_USER, selectedID: id });

// User.jsx
export const USER_MODAL = 'modal-user';
export const DELETE_USER_MODAL = 'modal-user-delete'; //  Modal.jsx
export const openDeleteUserModal = () => ({ type: USER_MODAL, modalType: DELETE_USER_MODAL });

// Tasks.jsx
export const TASKS_MODAL = 'modal-tasks';
export const DELETE_TASK = 'tasks-delete';
export const deleteTask = (id = '') => ({ type: DELETE_TASK, selectedID: id });

// Task.jsx
export const TASK_MODAL = 'modal-task';
export const DELETE_TASK_MODAL = 'modal-task-delete'; //  Modal.jsx
export const openDeleteTaskModal = () => ({ type: TASK_MODAL, modalType: DELETE_TASK_MODAL });

//  CreateUser.jsx
export const CREATE_USER_ONCHANGE = 'create-user-onchange';
export const createUserHandleInputChange = (event) => ({
  type: CREATE_USER_ONCHANGE,
  name: event.target.name,
  body: event.target.value,
});
