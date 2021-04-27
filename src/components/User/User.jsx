import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';
import noop from '../../shared/noop';
import Modal from '../Modals/Modal';
import { USER_MODAL_TOGGLE, USER_MODAL_DELETE_USER, reducerFunc } from './User-helpers';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      selectedModal: '',
    };
    this.liftUpDeleteUser = this.liftUpDeleteUser.bind(this);
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

  toggleModal(modalType) {
    this.setState((prevState) => reducerFunc(prevState, { type: USER_MODAL_TOGGLE, modalType }));
  }

  liftUpDeleteUser() {
    const { deleteUser } = this.props;
    const { selectedID } = this.state;
    deleteUser(selectedID);
  }

  render() {
    const {
      tableIndex,
      userData,
      userData: { fullname, direction, education, start, age },
    } = this.props;

    const { isOpen, selectedModal } = this.state;

    const toggleDeleteModal = () => {
      this.toggleModal(USER_MODAL_DELETE_USER);
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
            <Button onClick={noop}>Progress</Button>
            <Button onClick={noop}>Tasks</Button>
            <Button roleclass='edit' onClick={noop}>
              Edit
            </Button>
            <Button roleclass='delete' onClick={toggleDeleteModal}>
              Delete
            </Button>
          </div>
        </div>
        {isOpen ? (
          <Modal
            item={userData}
            actFunc={this.liftUpDeleteUser}
            closeFunc={toggleDeleteModal}
            selectedModal={selectedModal}
          />
        ) : null}
      </>
    );
  }
}

User.propTypes = {
  userData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  deleteUser: PropType.func.isRequired,
};
