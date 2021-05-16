import React from 'react';
import Button from '../components/Button/Button';
import classes from './Tasks.module.css';
import Task from '../components/Task/Task';
import Modal from '../components/Modals/Modal';
import { TASKS_MODAL_TOGGLE, TASKS_UPDATE, reducerFunc, TASKS_MODAL_CREATE_TASK } from './Tasks-helpers';
import {
  setElemToDB,
  deleteElemFromDB,
  editElemInDB,
  TASKS,
  USERS,
  addTaskToUser,
  deleteTaskFromUser,
  editTaskInUsers,
  getAllElementsFromCollection,
} from '../utilities/fb-helpers';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
      tasksList: [],
      usersList: [],
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.createTask = this.createTask.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.editTask = this.editTask.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    getAllElementsFromCollection(USERS).then((usersList) =>
      this.setState((prevState) => reducerFunc(prevState, { type: TASKS_UPDATE, name: 'usersList', list: usersList })),
    );
    this.updateData();
  }

  deleteTask(selectedId) {
    const { tasksList } = this.state;
    const assignedUsers = tasksList.find((task) => task.id === selectedId).selectedUsers;
    deleteElemFromDB(TASKS, selectedId, this.updateData);
    assignedUsers.forEach((assignedUserId) => deleteTaskFromUser(selectedId, assignedUserId));
  }

  editTask(editedTask) {
    const { tasksList } = this.state;
    const prevAssignedUsers = tasksList.find((task) => task.id === editedTask.id).selectedUsers;
    const newAssignedUsers = editedTask.selectedUsers;
    const usersToUnassign = prevAssignedUsers.filter((assignedUserId) => !newAssignedUsers.includes(assignedUserId));
    const usersToAssign = newAssignedUsers.filter((assignedUserId) => !prevAssignedUsers.includes(assignedUserId));
    editElemInDB(TASKS, editedTask, this.updateData);
    editTaskInUsers(usersToAssign, usersToUnassign, editedTask.id);
  }

  createTask(newTaskRef, newTask) {
    const newTaskId = newTask.id;
    const assignedUsers = newTask.selectedUsers;
    setElemToDB(newTaskRef, newTask, this.updateData);
    assignedUsers.forEach((assignedUserId) => addTaskToUser(newTaskId, assignedUserId));
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TASKS_MODAL_TOGGLE, modalType }));
  }

  updateData() {
    getAllElementsFromCollection(TASKS).then((tasksList) =>
      this.setState((prevState) => reducerFunc(prevState, { type: TASKS_UPDATE, name: 'tasksList', list: tasksList })),
    );
  }

  render() {
    const { tasksList, usersList, selectedModal, isOpen } = this.state;
    const openModal = () => this.toggleModal(TASKS_MODAL_CREATE_TASK);

    const tasks = tasksList.map((task, index) => {
      return (
        <Task
          usersList={usersList}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
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
          <Button roleClass='create' onClick={openModal}>
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
        {isOpen ? (
          <Modal
            list={usersList}
            closeFunc={this.toggleModal}
            actFunc={this.createTask}
            selectedModal={selectedModal}
          />
        ) : null}
      </div>
    );
  }
}
