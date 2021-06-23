import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import classes from './Task.module.css';
import Modal from '../Modals/Modal';
import DivAnchor from '../DivAnchor';
import { getInternationalDate } from '../../utilities/internationalization';
import {
  TASK_MODAL_TOGGLE,
  TASK_MODAL_DELETE_TASK,
  TASK_MODAL_SHOW_TASK,
  TASK_MODAL_EDIT_TASK,
  reducerFunc,
} from './task-helpers';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
    };
    this.liftUpDeleteTask = this.liftUpDeleteTask.bind(this);
    this.liftUpEditTask = this.liftUpEditTask.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.selectActFunc = this.selectActFunc.bind(this);
  }

  openDeleteModal = () => this.toggleModal(TASK_MODAL_DELETE_TASK);

  openShowModal = () => this.toggleModal(TASK_MODAL_SHOW_TASK);

  openEditModal = () => this.toggleModal(TASK_MODAL_EDIT_TASK);

  closeAnyModal = () => this.toggleModal();

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TASK_MODAL_TOGGLE, modalType }));
  }

  liftUpDeleteTask() {
    const {
      deleteTask,
      taskData: { id },
    } = this.props;
    deleteTask(id);
  }

  liftUpEditTask(editedTask) {
    const { editTask } = this.props;
    editTask(editedTask);
  }

  selectActFunc(editedTask = {}) {
    const { selectedModal } = this.state;
    if (selectedModal === TASK_MODAL_DELETE_TASK) {
      this.liftUpDeleteTask();
    } else if (selectedModal === TASK_MODAL_EDIT_TASK) {
      this.liftUpEditTask(editedTask);
    }
  }

  render() {
    const {
      usersList,
      taskData,
      tableIndex,
      taskData: { title, description, startDate, deadLine },
    } = this.props;
    const { isOpen, selectedModal } = this.state;

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <DivAnchor onClick={this.openShowModal}>{title}</DivAnchor>
          <div>{description}</div>
          <div>{getInternationalDate(startDate)}</div>
          <div>{getInternationalDate(deadLine)}</div>
          <div className={classes.buttons}>
            <Button roleClass='edit' onClick={this.openEditModal}>
              Edit
            </Button>
            <Button roleClass='delete' onClick={this.openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? (
          <Modal
            item={taskData}
            list={usersList}
            actFunc={this.selectActFunc}
            closeFunc={this.closeAnyModal}
            selectedModal={selectedModal}
          />
        ) : null}
      </>
    );
  }
}

Task.propTypes = {
  taskData: PropTypes.instanceOf(Object).isRequired,
  usersList: PropTypes.instanceOf(Array).isRequired,
  tableIndex: PropTypes.number.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};
