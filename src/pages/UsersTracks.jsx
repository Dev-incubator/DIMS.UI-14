import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import noop from '../shared/noop';
import Button from '../components/Button/Button';
import classes from './UsersTracks.module.css';
import Modal from '../components/Modals/Modal';
import { USERS, TASKS, getElementFromCollection, createTrack } from '../utilities/fb-helpers';
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
      taskData: {},
      tracks: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createTrack = this.createTrack.bind(this);
    // this.editTrack = this.editTrack.bind(this);
    // this.deleteTrack = this.deleteTrack.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { userID, taskID },
      },
    } = this.props;

    const task = await getElementFromCollection(TASKS, taskID);
    const taskData = task.data();
    const user = await getElementFromCollection(USERS, userID);
    const { tracks } = await user.data().tasks.find((item) => item.id === taskID);

    this.setState((prevState) => ({
      ...prevState,
      userID,
      taskID,
      taskData,
      tracks,
    }));
  }

  async updateData() {
    const { userID, taskID } = this.state;
    const user = await getElementFromCollection(USERS, userID);
    const { tracks } = await user.data().tasks.find((item) => item.id === taskID);
    this.setState((prevState) => ({
      ...prevState,
      tracks,
    }));
  }

  createTrack(newTrack) {
    const { userID, taskID } = this.state;
    createTrack(userID, taskID, newTrack, this.updateData);
  }

  // editTrack() {
  //   return noop;
  // }

  // deleteTrack() {
  //   return noop;
  // }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TRACKS_MODAL_TOGGLE, modalType }));
  }

  render() {
    const openModal = () => this.toggleModal(TRACKS_MODAL_CREATE_TRACK);
    const { userID, taskData, isOpen, selectedModal, tracks } = this.state;
    const tracksList = tracks.map((track, index) => {
      return (
        <Track
          track={track}
          tableIndex={index + 1}
          key={track.id}
          deleteTrack={noop}
          editTrack={noop}
          title={taskData.title}
        />
      );
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {`${taskData.title}'s task tracks`} <span>({`${tracks.length}`})</span>
          </h2>
          <div className={classes.buttonsWrapper}>
            <NavLink className={classes.navLink} to={`/users/${userID}/tasks`}>
              <Button onClick={noop}>Back</Button>
            </NavLink>
            <Button onClick={openModal} roleClass='create'>
              Create
            </Button>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Task Note</div>
            <div>Date</div>
            <div>Controls</div>
          </div>
          {tracksList}
        </div>
        {isOpen ? (
          <Modal
            item={taskData}
            closeFunc={this.toggleModal}
            actFunc={this.createTrack}
            selectedModal={selectedModal}
          />
        ) : null}
      </div>
    );
  }
}

UsersTracks.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
};
