import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import classes from './Tasks.module.css';
import Task from '../components/Task/Task';
import Modal from '../components/Modals/Modal';
import {
  setElemToDB,
  deleteElemFromDB,
  editElemInDB,
  TASKS,
  addTaskToUser,
  deleteTaskFromUser,
  editTaskInUsers,
} from '../utilities/fb-helpers';
import fetchTasks from '../store/actionCreators/fetchTasks';
import fetchUsers from '../store/actionCreators/fetchUsers';
import openCreateTaskModal from '../store/actionCreators/openCreateTaskModal';
import toggleModal from '../store/actionCreators/toggleModal';

const Tasks = () => {
  const dispatch = useDispatch();
  const { isModalOpen, selectedModal, loading } = useSelector((state) => state.app);
  const { tasksList } = useSelector((state) => state.tasks);
  const { usersList } = useSelector((state) => state.users);

  useEffect(() => {
    if (!usersList.length) {
      dispatch(fetchUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!tasksList.length) {
      dispatch(fetchTasks());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

  const handleOpenModalButton = () => dispatch(openCreateTaskModal());
  const handleCloseModalButton = () => dispatch(toggleModal());

  const deleteTask = (selectedId) => {
    const assignedUsers = tasksList.find((task) => task.id === selectedId).selectedUsers;
    deleteElemFromDB(TASKS, selectedId, () => dispatch(fetchTasks()));
    assignedUsers.forEach((assignedUserId) => deleteTaskFromUser(selectedId, assignedUserId));
  };

  const editTask = (editedTask) => {
    const prevAssignedUsers = tasksList.find((task) => task.id === editedTask.id).selectedUsers;
    const newAssignedUsers = editedTask.selectedUsers;
    const usersToUnassign = prevAssignedUsers.filter((assignedUserId) => !newAssignedUsers.includes(assignedUserId));
    const usersToAssign = newAssignedUsers.filter((assignedUserId) => !prevAssignedUsers.includes(assignedUserId));
    editElemInDB(TASKS, editedTask, () => dispatch(fetchTasks()));
    editTaskInUsers(usersToAssign, usersToUnassign, editedTask.id);
  };

  const createTask = (newTaskRef, newTask) => {
    const newTaskId = newTask.id;
    const assignedUsers = newTask.selectedUsers;
    setElemToDB(newTaskRef, newTask, () => dispatch(fetchTasks()));
    assignedUsers.forEach((assignedUserId) => addTaskToUser(newTaskId, assignedUserId));
  };

  const tasks = tasksList.map((task, index) => {
    return (
      <Task
        usersList={usersList}
        deleteTask={deleteTask}
        editTask={editTask}
        key={task.id}
        taskData={task}
        tableIndex={index + 1}
      />
    );
  });

  return (
    <div>
      <div className={classes.header}>
        <h2 className={classes.title}>
          Tasks <span>({`${tasksList.length}`})</span>
        </h2>
        <Button roleClass='create' onClick={handleOpenModalButton}>
          Create
        </Button>
      </div>
      <div className={classes.content}>
        <div className={classes.subheader}>
          <div>№</div>
          <div>Task Name</div>
          <div>Description</div>
          <div>Start Date</div>
          <div>Deadline</div>
          <div>Controls</div>
        </div>
        {tasks}
      </div>
      {isModalOpen ? (
        <Modal list={usersList} closeFunc={handleCloseModalButton} actFunc={createTask} selectedModal={selectedModal} />
      ) : null}
    </div>
  );
};

export default Tasks;
