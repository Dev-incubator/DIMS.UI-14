import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './Task.module.css';
import Modal from '../Modals/Modal';
import noop from '../../shared/noop';
import { TASK_MODAL_TOGGLE, TASK_MODAL_DELETE_TASK, reducerFunc } from './Task-helpers';

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

  toggleModal(modalType) {
    this.setState((prevState) => reducerFunc(prevState, { type: TASK_MODAL_TOGGLE, modalType }));
  }

  liftUpDeleteTask() {
    const { deleteTask } = this.props;
    const { selectedID } = this.state;
    deleteTask(selectedID);
  }

  render() {
    const {
      taskData,
      tableIndex,
      taskData: { taskName, description, startDate, deadline },
    } = this.props;
    const { isOpen, selectedModal } = this.state;

    const toggleDeleteModal = () => {
      this.toggleModal(TASK_MODAL_DELETE_TASK);
    };

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <div>{taskName}</div>
          <div>{description}</div>
          <div>{startDate}</div>
          <div>{deadline}</div>
          <div className={classes.buttons}>
            <Button roleclass='edit' onClick={noop}>
              Edit
            </Button>
            <Button roleclass='delete' onClick={toggleDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? (
          <Modal
            item={taskData}
            actFunc={this.liftUpDeleteTask}
            closeFunc={toggleDeleteModal}
            selectedModal={selectedModal}
          />
        ) : null}
      </>
    );
  }
}

Task.propTypes = {
  taskData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  deleteTask: PropType.func.isRequired,
};
