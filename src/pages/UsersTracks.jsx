import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import noop from '../shared/noop';
import Button from '../components/Button/Button';
import classes from './UsersTracks.module.css';
import Modal from '../components/Modals/Modal';
import { USERS, TASKS, getElementFromCollection, createTrack, editTrack, deleteTrack } from '../utilities/fb-helpers';
import Track from '../components/Track/Track';
import { TRACKS_MODAL_CREATE_TRACK, TRACKS_MODAL_TOGGLE, reducerFunc } from './UsersTracks-helpers';

export default class UsersTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
      userId: '',
      taskId: '',
      taskData: {},
      tracks: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createTrack = this.createTrack.bind(this);
    this.editTrack = this.editTrack.bind(this);
    this.deleteTrack = this.deleteTrack.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  async componentDidMount() {
    const {
      match: {
        params: { userId, taskId },
      },
    } = this.props;

    const task = await getElementFromCollection(TASKS, taskId);
    const taskData = task.data();
    const user = await getElementFromCollection(USERS, userId);
    const { tracks } = await user.data().tasks.find((item) => item.id === taskId);

    this.setState((prevState) => ({
      ...prevState,
      userId,
      taskId,
      taskData,
      tracks,
    }));
  }

  async updateData() {
    const { userId, taskId } = this.state;
    const user = await getElementFromCollection(USERS, userId);
    const { tracks } = await user.data().tasks.find((item) => item.id === taskId);
    this.setState((prevState) => ({
      ...prevState,
      tracks,
    }));
  }

  createTrack(newTrack) {
    const { userId, taskId } = this.state;
    createTrack(userId, taskId, newTrack, this.updateData);
  }

  editTrack(editedTrack) {
    const { userId, taskId } = this.state;
    editTrack(userId, taskId, editedTrack, this.updateData);
  }

  deleteTrack(trackId) {
    const { userId, taskId } = this.state;
    deleteTrack(userId, taskId, trackId, this.updateData);
  }

  toggleModal(modalType = '') {
    this.setState((prevState) => reducerFunc(prevState, { type: TRACKS_MODAL_TOGGLE, modalType }));
  }

  render() {
    const openModal = () => this.toggleModal(TRACKS_MODAL_CREATE_TRACK);
    const { userId, taskData, isOpen, selectedModal, tracks } = this.state;
    const tracksList = tracks.map((track, index) => {
      return (
        <Track
          track={track}
          tableIndex={index + 1}
          key={track.id}
          deleteTrack={this.deleteTrack}
          editTrack={this.editTrack}
          taskData={taskData}
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
            <NavLink className={classes.navLink} to={`/users/${userId}/tasks`}>
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
