import React from 'react';
import PropType from 'prop-types';
import noop from '../shared/noop';
import Button from '../components/Button/Button';
import classes from './UsersTracks.module.css';
import Modal from '../components/Modals/Modal';
import { USERS, TASKS, getElementFromCollection } from '../utilities/fb-helpers';
import Track from '../components/Track/Track';
import { TRACKS_MODAL_CREATE_TRACK, TRACKS_MODAL_TOGGLE, reducerFunc } from './UsersTracks-helpers';

export default class UsersTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
      userID: '',
      taskID: '',
      taskWithStatus: '',
      taskData: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { userID, taskID },
      },
    } = this.props;

    const user = await getElementFromCollection(USERS, userID);
    const taskWithStatus = await user.data().tasks.find((item) => item.id === taskID);
    const task = await getElementFromCollection(TASKS, taskID);
    const taskData = task.data();

    this.setState((prevState) => ({
      ...prevState,
      userID,
      taskID,
      taskData,
      taskWithStatus,
    }));
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TRACKS_MODAL_TOGGLE, modalType }));
  }

  render() {
    const openModal = () => this.toggleModal(TRACKS_MODAL_CREATE_TRACK);
    const { isOpen, selectedModal } = this.state;

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>Task tracks</h2>
          <Button onClick={openModal} roleClass='create'>
            Create
          </Button>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Task Note</div>
            <div>Date</div>
            <div>Controls</div>
          </div>
          <Track />
        </div>
        {isOpen ? <Modal closeFunc={this.toggleModal} actFunc={noop} selectedModal={selectedModal} /> : null}
      </div>
    );
  }
}

UsersTracks.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
};
