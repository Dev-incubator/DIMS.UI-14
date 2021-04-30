// Tasks.jsx
export const TASKS_MODAL = 'modal-tasks';
export const DELETE_TASK = 'tasks-delete';
export const deleteTask = (id = '') => ({ type: DELETE_TASK, selectedID: id });

// Task.jsx
export const TASK_MODAL = 'modal-task';
export const DELETE_TASK_MODAL = 'modal-task-delete'; //  Modal.jsx
export const openDeleteTaskModal = () => ({ type: TASK_MODAL, modalType: DELETE_TASK_MODAL });
