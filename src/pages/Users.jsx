import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ROLES } from '../utilities/enums';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import classes from './Users.module.css';
import UserWithContext from '../components/ContextHOCs/UserWithContext';
import Modal from '../components/Modals/Modal';
import {
  setElemToDB,
  deleteElemFromDB,
  deleteUserFromTask,
  editElemInDB,
  USERS,
  createAuthForNewUser,
  deleteUserAuth,
  updateUserAuthData,
} from '../utilities/fb-helpers';
import toggleModal from '../store/actionCreators/toggleModal';
import fetchUsers from '../store/actionCreators/fetchUsers';
import openCreateUserModal from '../store/actionCreators/openCreateUserModal';

class Users extends React.PureComponent {
  deleteUser = (selectedId) => {
    const { usersList, fetchUsers } = this.props;
    const userToDelete = usersList.find((item) => item.id === selectedId);
    const assignedTasks = userToDelete.tasks;
    deleteElemFromDB(USERS, selectedId, fetchUsers);
    deleteUserAuth(userToDelete);
    if (assignedTasks.length) {
      assignedTasks.forEach((assignedTask) => deleteUserFromTask(selectedId, assignedTask.id));
    }
  };

  editUser = (editedUser) => {
    const { usersList, fetchUsers } = this.props;
    const prevUserData = usersList.find((item) => item.id === editedUser.id);
    editElemInDB(USERS, editedUser, fetchUsers);
    updateUserAuthData(prevUserData, editedUser);
  };

  createUser = (newUserRef, newUser) => {
    const { fetchUsers } = this.props;
    setElemToDB(newUserRef, newUser, fetchUsers);
    const { email, password } = newUser;
    createAuthForNewUser(email, password);
  };

  render() {
    const {
      usersList,
      openCreateUserModal,
      toggleModal,
      loggedUser: { role },
      app: { isModalOpen, loading, selectedModal },
    } = this.props;

    if (loading) {
      return <Loader />;
    }

    const users = usersList.map((user, index) => {
      return (
        <UserWithContext
          deleteUser={this.deleteUser}
          editUser={this.editUser}
          key={user.id}
          userData={user}
          tableIndex={index + 1}
        />
      );
    });

    const isAdmin = role === ROLES.ADMIN;

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            Users <span>({`${usersList.length}`})</span>
          </h2>
          {isAdmin ? (
            <Button onClick={openCreateUserModal} roleClass='create'>
              Create
            </Button>
          ) : null}
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Full Name</div>
            <div>Direction</div>
            <div>Education</div>
            <div>Start</div>
            <div>Age</div>
            <div>Controls</div>
          </div>
          {users}
        </div>
        {isModalOpen ? <Modal closeFunc={toggleModal} actFunc={this.createUser} selectedModal={selectedModal} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    usersList: state.users.usersList,
    tasksList: state.tasks.tasksList,
  };
};

const mapDispatchToProps = {
  toggleModal,
  fetchUsers,
  openCreateUserModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

Users.propTypes = {
  loggedUser: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  usersList: PropTypes.instanceOf(Array).isRequired,
  fetchUsers: PropTypes.func.isRequired,
  app: PropTypes.shape({
    isModalOpen: PropTypes.bool,
    selectedModal: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  openCreateUserModal: PropTypes.func.isRequired,
};
