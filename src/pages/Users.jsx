import { connect } from 'react-redux';
import { useEffect } from 'react';
import PropType from 'prop-types';
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

const Users = ({
  fetchUsers,
  loggedUser: { role },
  app: { isModalOpen, loading, selectedModal },
  usersList,
  toggleModal,
  openCreateUserModal,
}) => {
  useEffect(() => {
    if (!usersList.length) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;

  const deleteUser = (selectedId) => {
    const userToDelete = usersList.find((item) => item.id === selectedId);
    const assignedTasks = userToDelete.tasks;
    deleteElemFromDB(USERS, selectedId, fetchUsers);
    deleteUserAuth(userToDelete);
    if (assignedTasks.length) {
      assignedTasks.forEach((assignedTask) => deleteUserFromTask(selectedId, assignedTask.id));
    }
  };

  const editUser = (editedUser) => {
    const prevUserData = usersList.find((item) => item.id === editedUser.id);
    editElemInDB(USERS, editedUser, fetchUsers);
    updateUserAuthData(prevUserData, editedUser);
  };

  const createUser = (newUserRef, newUser) => {
    setElemToDB(newUserRef, newUser, fetchUsers);
    const { email, password } = newUser;
    createAuthForNewUser(email, password);
  };

  const users = usersList.map((user, index) => {
    return (
      <UserWithContext
        deleteUser={deleteUser}
        editUser={editUser}
        key={user.id}
        userData={user}
        tableIndex={index + 1}
      />
    );
  });

  const isAdmin = role === 'Admin';

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
      {isModalOpen ? <Modal closeFunc={toggleModal} actFunc={createUser} selectedModal={selectedModal} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
    usersList: state.users.usersList,
  };
};

const mapDispatchToProps = {
  toggleModal,
  fetchUsers,
  openCreateUserModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

Users.propTypes = {
  loggedUser: PropType.instanceOf(Object).isRequired,
  usersList: PropType.instanceOf(Array).isRequired,
  fetchUsers: PropType.func.isRequired,
  app: PropType.shape({
    isModalOpen: PropType.bool,
    selectedModal: PropType.string,
    loading: PropType.bool,
  }).isRequired,
  toggleModal: PropType.func.isRequired,
  openCreateUserModal: PropType.func.isRequired,
};
