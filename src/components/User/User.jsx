import React from 'react';
import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';
import Modal from '../Modals/Modal';
import { USER_MODAL, DELETE_USER, openDeleteUserModal, deleteUser } from '../../utilities/actionCreators';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      selectedModal: '',
    };
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

  dispatch(action) {
    const { dispatch } = this.props;
    const { selectedID } = this.state;
    switch (action.type) {
      case USER_MODAL:
        this.setState((prevState) => ({
          ...prevState,
          isOpen: !prevState.isOpen,
          selectedModal: action.modalType,
        }));
        break;
      case DELETE_USER:
        dispatch(deleteUser(selectedID));
        break;
      default:
        break;
    }
  }

  render() {
    const {
      tableIndex,
      userData,
      userData: { fullname, direction, education, start, age },
    } = this.props;

    const openDeleteModal = () => {
      this.dispatch(openDeleteUserModal());
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
        <Modal item={userData} settings={this.state} dispatch={this.dispatch} />
      </>
    );
  }
}

User.propTypes = {
  userData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  dispatch: PropType.func.isRequired,
};
