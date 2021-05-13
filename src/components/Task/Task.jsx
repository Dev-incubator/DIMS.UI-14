import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './Task.module.css';
import Modal from '../Modals/Modal';
import noop from '../../shared/noop';
import DivAnchor from '../DivAnchor';
import { internationalizeDate } from '../../utilities/internationalization';
import {
  TASK_MODAL_TOGGLE,
  TASK_MODAL_DELETE_TASK,
  TASK_MODAL_SHOW_TASK,
  TASK_MODAL_EDIT_TASK,
  reducerFunc,
} from './Task-helpers';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      selectedModal: '',
    };
    this.liftUpDeleteTask = this.liftUpDeleteTask.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const {
      taskData: { id },
    } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      selectedID: id,
    }));
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TASK_MODAL_TOGGLE, modalType }));
  }

  liftUpDeleteTask() {
    const { deleteTask } = this.props;
    const { selectedID } = this.state;
    deleteTask(selectedID);
  }

  liftUpEditTask(editedTask) {
    const { editTask } = this.props;
    editTask(editedTask);
  }

  render() {
    const {
      taskData,
      tableIndex,
      taskData: { title, description, startDate, deadLine },
    } = this.props;
    const { isOpen, selectedModal } = this.state;

    const openDeleteModal = () => this.toggleModal(TASK_MODAL_DELETE_TASK);
    const openShowModal = () => this.toggleModal(TASK_MODAL_SHOW_TASK);
    const openEditModal = () => this.toggleModal(TASK_MODAL_EDIT_TASK);
    const closeAnyModal = () => this.toggleModal();
    const selectActFunc = () => {
      switch (selectedModal) {
        case TASK_MODAL_DELETE_TASK:
          return (editedTask) => this.liftUpDeleteTask(editedTask);
        case TASK_MODAL_EDIT_TASK:
          return (editedTask) => this.liftUpEditTask(editedTask);
        default:
          return () => noop;
      }
    };

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <DivAnchor onClick={openShowModal}>{title}</DivAnchor>
          <div>{description}</div>
          <div>{internationalizeDate(startDate)}</div>
          <div>{internationalizeDate(deadLine)}</div>
          <div className={classes.buttons}>
            <Button roleClass='edit' onClick={openEditModal}>
              Edit
            </Button>
            <Button roleClass='delete' onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? (
          <Modal item={taskData} actFunc={selectActFunc()} closeFunc={closeAnyModal} selectedModal={selectedModal} />
        ) : null}
      </>
    );
  }
}

Task.propTypes = {
  taskData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  deleteTask: PropType.func.isRequired,
  editTask: PropType.func.isRequired,
};
