import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './Task.module.css';
import Modal from '../Modals/Modal';
import { TASK_MODAL, DELETE_TASK, openDeleteTaskModal, deleteTask } from '../../utilities/actionCreators';

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      selectedModal: '',
    };
    this.dispatch = this.dispatch.bind(this);
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

  dispatch(action) {
    const { dispatch } = this.props;
    const { selectedID } = this.state;
    switch (action.type) {
      case TASK_MODAL:
        this.setState((prevState) => ({
          ...prevState,
          isOpen: !prevState.isOpen,
          selectedModal: action.modalType,
        }));
        break;
      case DELETE_TASK:
        dispatch(deleteTask(selectedID));
        break;
      default:
        break;
    }
  }

  render() {
    const {
      taskData,
      tableIndex,
      taskData: { taskName, description, startDate, deadline },
    } = this.props;

    const openDeleteModal = () => {
      this.dispatch(openDeleteTaskModal());
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
            <Button roleclass='edit' onClick={() => {}}>
              Edit
            </Button>
            <Button roleclass='delete' onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        <Modal item={taskData} settings={this.state} dispatch={this.dispatch} />
      </>
    );
  }
}

Task.propTypes = {
  dispatch: PropType.func.isRequired,
  taskData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
};
