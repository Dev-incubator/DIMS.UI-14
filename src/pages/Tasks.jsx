import React from 'react';
import Button from '../components/Button/Button';
import classes from './Tasks.module.css';
import Task from '../components/Task/Task';
import Modal from '../components/Modals/Modal';
import { TASKS_MODAL_TOGGLE, reducerFunc, TASKS_MODAL_CREATE_TASK } from './Tasks-helpers';
import { setElemToDB, deleteElemFromDB, editElemInDB, db, TASKS } from '../utilities/fb-helpers';

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedMoal: '',
      tasksList: [],
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.createTask = this.createTask.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.editTask = this.editTask.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  deleteTask(selectedID) {
    deleteElemFromDB(TASKS, selectedID);
    this.updateData();
  }

  editTask(editedTask) {
    editElemInDB(TASKS, editedTask);
    this.updateData();
  }

  createTask(newTaskRef, newTask) {
    setElemToDB(newTaskRef, newTask);
    this.updateData();
  }

  toggleModal(modalType) {
    this.setState((prevState) => reducerFunc(prevState, { type: TASKS_MODAL_TOGGLE, modalType }));
  }

  updateData() {
    db.collection(TASKS)
      .get()
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
    const { tasksList, selectedModal, isOpen } = this.state;
    const toggleModal = () => this.toggleModal(TASKS_MODAL_CREATE_TASK);
    const createTask = (newTaskRef, newTask) => this.createTask(newTaskRef, newTask);
    const editTask = (editedTask) => this.editTask(editedTask);
    const deleteTask = (selectedID) => this.deleteTask(selectedID);

    const tasks = tasksList.map((task, index) => {
      return <Task deleteTask={deleteTask} editTask={editTask} key={task.id} taskData={task} tableIndex={index + 1} />;
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            Tasks <span>({`${tasksList.length}`})</span>
          </h2>
          <Button roleclass='create' onClick={toggleModal}>
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
        {isOpen ? <Modal closeFunc={toggleModal} actFunc={createTask} selectedModal={selectedModal} /> : null}
      </div>
    );
  }
}
