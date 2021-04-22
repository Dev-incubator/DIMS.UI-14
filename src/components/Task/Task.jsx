import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './Task.module.css';
import Modal from '../Modals/Modal';

const MODAL = 'MODAL';
const DELETE = 'DELETE';
export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      selectedModal: '',
      localActionTypes: {
        modal: MODAL,
        deleteTask: DELETE,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    const {
      dispatch,
      actionTypes: { deleteTask },
    } = this.props;
    const { selectedID } = this.state;
    dispatch({ type: deleteTask, selectedID });
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
      selectedModal: modalType,
    }));
  }

  dispatch(action) {
    switch (action.type) {
      case MODAL:
        this.toggleModal(action.modalType);
        break;
      case DELETE:
        this.handleDelete();
        this.toggleModal(action.modalType);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      taskData,
      tableIndex,
      modalTypes,
      modalTypes: { deleteTask },
      taskData: { taskName, description, startDate, deadline },
    } = this.props;

    const {
      localActionTypes: { modal },
    } = this.state;

    const openDeleteModal = () => {
      this.dispatch({ type: modal, modalType: deleteTask });
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
        <Modal
          item={taskData}
          modalSettingsAndActionTypes={this.state}
          modalTypes={modalTypes}
          dispatch={this.dispatch}
        />
      </>
    );
  }
}

Task.propTypes = {
  dispatch: PropType.func.isRequired,
  taskData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  modalTypes: PropType.instanceOf(Object).isRequired,
  actionTypes: PropType.instanceOf(Object).isRequired,
};
