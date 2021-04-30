import React from 'react';
import Button from '../components/Button/Button';
import classes from './Users.module.css';
import User from '../components/User/User';
import Modal from '../components/Modals/Modal';
import { USERS_DELETE_USER, USERS_MODAL_TOGGLE, USERS_MODAL_CREATE_USER, reducerFunc } from './Users-helpers';
import { setDataToDB, db, USERS } from '../utilities/fb-helpers';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
      usersList: [],
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    const usersList = [];
    db.collection(USERS)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data());
        });
        return usersList;
      })
      .then((usersList) =>
        this.setState((prevState) => ({
          ...prevState,
          usersList,
        })),
      )
      .catch((error) => {
        console.log('Error reading users collection: ', error);
      });
  }

  deleteUser(selectedID) {
    this.setState((prevState) => reducerFunc(prevState, { type: USERS_DELETE_USER, selectedID }));
  }

  toggleModal(modalType) {
    this.setState((prevState) => reducerFunc(prevState, { type: USERS_MODAL_TOGGLE, modalType }));
  }

  editUser(editedUser) {
    const usersList = [];

    db.collection(USERS)
      .doc(editedUser.id)
      .set(editedUser)
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.log('Error writting document: ', error);
      });

    db.collection(USERS)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data());
        });
        return usersList;
      })
      .then((usersList) =>
        this.setState((prevState) => ({
          ...prevState,
          usersList,
        })),
      )
      .catch((error) => {
        console.log('Error reading users collection: ', error);
      });
  }

  render() {
    const { usersList, selectedModal, isOpen } = this.state;
    const toggleModal = () => {
      this.toggleModal(USERS_MODAL_CREATE_USER);
    };
    const createUser = (newUserRef, newUser) => {
      setDataToDB(newUserRef, newUser);
    };

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
          <Button onClick={toggleModal} roleclass='create'>
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
        {isOpen ? <Modal closeFunc={toggleModal} actFunc={createUser} selectedModal={selectedModal} /> : null}
      </div>
    );
  }
}
