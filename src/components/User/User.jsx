import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';
import noop from '../../shared/noop';
import Modal from '../Modals/Modal';
import DivAnchor from '../DivAnchor';
import { intDate } from '../../utilities/internationalization';
import {
  USER_MODAL_TOGGLE,
  USER_MODAL_DELETE_USER,
  USER_MODAL_EDIT_USER,
  USER_MODAL_SHOW_USER,
  reducerFunc,
} from './User-helpers';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      selectedModal: '',
    };
    this.liftUpDeleteUser = this.liftUpDeleteUser.bind(this);
    this.liftUpEditUser = this.liftUpEditUser.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: USER_MODAL_TOGGLE, modalType }));
  }

  liftUpDeleteUser() {
    const { deleteUser } = this.props;
    const { selectedID } = this.state;
    deleteUser(selectedID);
  }

  liftUpEditUser(editedUser) {
    const { editUser } = this.props;
    editUser(editedUser);
  }

  render() {
    const {
      tableIndex,
      userData,
      userData: { username, surname, direction, education, startDate, dateOfBirth },
    } = this.props;
    const { isOpen, selectedModal } = this.state;

    const openDeleteModal = () => this.toggleModal(USER_MODAL_DELETE_USER);
    const openEditModal = () => this.toggleModal(USER_MODAL_EDIT_USER);
    const openShowModal = () => this.toggleModal(USER_MODAL_SHOW_USER);
    const closeAnyModal = () => this.toggleModal();
    const selectActFunc = () => {
      switch (selectedModal) {
        case USER_MODAL_DELETE_USER:
          return (editedUser) => this.liftUpDeleteUser(editedUser);
        case USER_MODAL_EDIT_USER:
          return (editedUser) => this.liftUpEditUser(editedUser);
        default:
          return () => noop;
      }
    };

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <DivAnchor onClick={openShowModal}>
            {username} {surname}
          </DivAnchor>
          <div>{direction}</div>
          <div>{education}</div>
          <div>{intDate(startDate)}</div>
          <div>{new Date().getFullYear() - new Date(dateOfBirth).getFullYear()}</div>
          <div className={classes.buttons}>
            <Button onClick={noop}>Progress</Button>
            <Button onClick={noop}>Tasks</Button>
            <Button roleclass='edit' onClick={openEditModal}>
              Edit
            </Button>
            <Button roleclass='delete' onClick={openDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? (
          <Modal item={userData} actFunc={selectActFunc()} closeFunc={closeAnyModal} selectedModal={selectedModal} />
        ) : null}
      </>
    );
  }
}

User.propTypes = {
  userData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  deleteUser: PropType.func.isRequired,
  editUser: PropType.func.isRequired,
};
