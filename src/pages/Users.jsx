import React from 'react';
import Button from '../components/Button/Button';
import classes from './Users.module.css';
import User from '../components/User/User';
import Modal from '../components/Modals/Modal';
import { USERS_MODAL_TOGGLE, USERS_UPDATE, USERS_MODAL_CREATE_USER, reducerFunc } from './users-helpers';
import {
  setElemToDB,
  deleteElemFromDB,
  deleteUserFromTask,
  editElemInDB,
  USERS,
  getAllElementsFromCollection,
} from '../utilities/fb-helpers';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
      usersList: [],
    };
    this.updateData = this.updateData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentDidMount() {
    this.updateData();
  }

  openCreateModal = () => this.toggleModal(USERS_MODAL_CREATE_USER);

  toggleModal(modalType) {
    this.setState((prevState) => reducerFunc(prevState, { type: USERS_MODAL_TOGGLE, modalType }));
  }

  updateData() {
    getAllElementsFromCollection(USERS).then((usersList) =>
      this.setState((prevState) => reducerFunc(prevState, { type: USERS_UPDATE, usersList })),
    );
  }

  deleteUser(selectedId) {
    const { usersList } = this.state;
    const assignedTasks = usersList.find((item) => item.id === selectedId).tasks;
    deleteElemFromDB(USERS, selectedId, this.updateData);
    if (assignedTasks.length) {
      assignedTasks.forEach((assignedTask) => deleteUserFromTask(selectedId, assignedTask.id));
    }
  }

  editUser(editedUser) {
    editElemInDB(USERS, editedUser, this.updateData);
  }

  createUser(newUserRef, newUser) {
    setElemToDB(newUserRef, newUser, this.updateData);
  }

  render() {
    const { usersList, selectedModal, isOpen } = this.state;

    const users = usersList.map((user, index) => {
      return (
        <User
          deleteUser={this.deleteUser}
          editUser={this.editUser}
          key={user.id}
          userData={user}
          tableIndex={index + 1}
        />
      );
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            Users <span>({`${usersList.length}`})</span>
          </h2>
          <Button onClick={this.openCreateModal} roleClass='create'>
            Create
          </Button>
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
        {isOpen ? <Modal closeFunc={this.toggleModal} actFunc={this.createUser} selectedModal={selectedModal} /> : null}
      </div>
    );
  }
}
