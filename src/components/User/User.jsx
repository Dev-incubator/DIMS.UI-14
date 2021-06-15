import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button';
import classes from './User.module.css';
import noop from '../../shared/noop';
import Modal from '../Modals/Modal';
import DivAnchor from '../DivAnchor';
import { getInternationalDate } from '../../utilities/internationalization';
import {
  USER_MODAL_TOGGLE,
  USER_MODAL_DELETE_USER,
  USER_MODAL_EDIT_USER,
  USER_MODAL_SHOW_USER,
  reducerFunc,
} from './user-helpers';
import { ROLES } from '../../utilities/enums';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
    };
    this.liftUpDeleteUser = this.liftUpDeleteUser.bind(this);
    this.liftUpEditUser = this.liftUpEditUser.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.selectActFunc = this.selectActFunc.bind(this);
  }

  openDeleteModal = () => this.toggleModal(USER_MODAL_DELETE_USER);

  openEditModal = () => this.toggleModal(USER_MODAL_EDIT_USER);

  openShowModal = () => this.toggleModal(USER_MODAL_SHOW_USER);

  closeAnyModal = () => this.toggleModal();

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: USER_MODAL_TOGGLE, modalType }));
  }

  liftUpDeleteUser() {
    const {
      deleteUser,
      userData: { id },
    } = this.props;
    deleteUser(id);
  }

  liftUpEditUser(editedUser) {
    const { editUser } = this.props;
    editUser(editedUser);
  }

  selectActFunc(editedUser = {}) {
    const { selectedModal } = this.state;
    if (selectedModal === USER_MODAL_DELETE_USER) {
      this.liftUpDeleteUser();
    } else if (selectedModal === USER_MODAL_EDIT_USER) {
      this.liftUpEditUser(editedUser);
    }
  }

  render() {
    const {
      tableIndex,
      userData,
      userData: { id, username, surname, direction, education, startDate, dateOfBirth },
      loggedUser: { role },
    } = this.props;
    const { isOpen, selectedModal } = this.state;
    const isAdmin = role === ROLES.ADMIN;

    return (
      <>
        <div className={classes.item}>
          <div>{tableIndex}</div>
          <DivAnchor onClick={this.openShowModal}>
            {username} {surname}
          </DivAnchor>
          <div>{direction}</div>
          <div>{education}</div>
          <div>{getInternationalDate(startDate)}</div>
          <div>{new Date().getFullYear() - new Date(dateOfBirth).getFullYear()}</div>
          <div className={classes.buttons}>
            <NavLink className={classes.navLink} to={`/main/users/${id}/tasks`}>
              <Button onClick={noop}>Tasks</Button>
            </NavLink>
            <NavLink className={classes.navLink} to={`/main/users/${id}/progress`}>
              <Button onClick={noop}>Progress</Button>
            </NavLink>
            {isAdmin ? (
              <>
                <Button roleClass='edit' onClick={this.openEditModal}>
                  Edit
                </Button>
                <Button roleClass='delete' onClick={this.openDeleteModal}>
                  Delete
                </Button>
              </>
            ) : null}
          </div>
        </div>
        {isOpen ? (
          <Modal
            item={userData}
            actFunc={this.selectActFunc}
            closeFunc={this.closeAnyModal}
            selectedModal={selectedModal}
          />
        ) : null}
      </>
    );
  }
}

User.propTypes = {
  userData: PropType.instanceOf(Object).isRequired,
  loggedUser: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  deleteUser: PropType.func.isRequired,
  editUser: PropType.func.isRequired,
};
