import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';
import Modal from '../Modals/Modal';

const MODAL = 'MODAL';
const DELETE = 'DELETE';
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      selectedModal: '',
      localActionTypes: {
        modal: MODAL,
        deleteUser: DELETE,
      },
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  componentDidMount() {
    const {
      userData: { id },
    } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      selectedID: id,
    }));
  }

  handleDelete() {
    const {
      dispatch,
      actionTypes: { deleteUser },
    } = this.props;
    const { selectedID } = this.state;
    dispatch({ type: deleteUser, selectedID });
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
      userData,
      tableIndex,
      modalTypes,
      modalTypes: { deleteUser },
      userData: { fullname, direction, education, start, age },
    } = this.props;

    const {
      localActionTypes: { modal },
    } = this.state;

    const openDeleteModal = () => {
      this.dispatch({ type: modal, modalType: deleteUser });
    };

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <div>{fullname}</div>
          <div>{direction}</div>
          <div>{education}</div>
          <div>{start}</div>
          <div>{age}</div>
          <div className={classes.buttons}>
            <Button onClick={() => {}}>Progress</Button>
            <Button onClick={() => {}}>Tasks</Button>
            <Button roleclass='edit' onClick={() => {}}>
              Edit
            </Button>
            <Button roleclass='delete' onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        <Modal
          item={userData}
          modalSettingsAndActionTypes={this.state}
          modalTypes={modalTypes}
          dispatch={this.dispatch}
        />
      </>
    );
  }
}

User.propTypes = {
  dispatch: PropType.func.isRequired,
  userData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  modalTypes: PropType.instanceOf(Object).isRequired,
  actionTypes: PropType.instanceOf(Object).isRequired,
};
