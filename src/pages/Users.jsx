import React from 'react';
import Button from '../components/Button/Button';
import classes from './Users.module.css';
import User from '../components/User/User';
import Modal from '../components/Modals/Modal';
import { USERS_MODAL_TOGGLE, USERS_MODAL_CREATE_USER, reducerFunc } from './Users-helpers';
import { setElemToDB, deleteElemFromDB, editElemInDB, db, USERS } from '../utilities/fb-helpers';

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

  toggleModal(modalType) {
    this.setState((prevState) => reducerFunc(prevState, { type: USERS_MODAL_TOGGLE, modalType }));
  }

  updateData() {
    db.collection(USERS)
      .get()
      .then((querySnapshot) => {
        const usersList = [];
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
    deleteElemFromDB(USERS, selectedID);
    this.updateData();
  }

  editUser(editedUser) {
    editElemInDB(USERS, editedUser);
    this.updateData();
  }

  createUser(newUserRef, newUser) {
    setElemToDB(newUserRef, newUser);
    this.updateData();
  }

  render() {
    const { usersList, selectedModal, isOpen } = this.state;
    const toggleModal = () => this.toggleModal(USERS_MODAL_CREATE_USER);
    const createUser = (newUserRef, newUser) => this.createUser(newUserRef, newUser);
    const editUser = (editedUser) => this.editUser(editedUser);
    const deleteUser = (selectedID) => this.deleteUser(selectedID);

    const users = usersList.map((user, index) => {
      return <User deleteUser={deleteUser} editUser={editUser} key={user.id} userData={user} tableIndex={index + 1} />;
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
