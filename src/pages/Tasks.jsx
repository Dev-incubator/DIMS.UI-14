import React from 'react';
import Button from '../components/Button/Button';
import classes from './Tasks.module.css';
import Task from '../components/Task/Task';
import Modal from '../components/Modals/Modal';
import { TASKS_MODAL_TOGGLE, reducerFunc, TASKS_MODAL_CREATE_TASK } from './Tasks-helpers';
import {
  setElemToDB,
  deleteElemFromDB,
  editElemInDB,
  getCollection,
  TASKS,
  USERS,
  addTaskToUsers,
  deleteTaskFromUsers,
  editTaskInUsers,
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
    getCollection(USERS)
      .then((querySnapshot) => {
        const usersList = [];
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data());
        });

        return usersList;
      })
      .then((usersList) =>
        this.setState((prevState) => ({
          ...prevState,
          usersList,
        })),
      )
      .catch((error) => {
        console.log('Error reading USERS collection: ', error);
      });
    this.updateData();
  }

  deleteTask(selectedID) {
    const { tasksList } = this.state;
    const taskToDelete = tasksList.find((item) => item.id === selectedID);
    deleteElemFromDB(TASKS, selectedID, this.updateData);
    deleteTaskFromUsers(taskToDelete);
  }

  editTask(editedTask) {
    const { tasksList } = this.state;
    const prevTask = tasksList.find((item) => item.id === editedTask.id);
    editElemInDB(TASKS, editedTask, this.updateData);
    editTaskInUsers(prevTask, editedTask);
  }

  createTask(newTaskRef, newTask) {
    setElemToDB(newTaskRef, newTask, this.updateData);
    addTaskToUsers(newTask);
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TASKS_MODAL_TOGGLE, modalType }));
  }

  updateData() {
    getCollection(TASKS)
      .then((querySnapshot) => {
        const tasksList = [];
        querySnapshot.forEach((doc) => {
          tasksList.push(doc.data());
        });

        return tasksList;
      })
      .then((tasksList) =>
        this.setState((prevState) => ({
          ...prevState,
          tasksList,
        })),
      )
      .catch((error) => {
        console.log('Error reading tasks collection: ', error);
      });
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
