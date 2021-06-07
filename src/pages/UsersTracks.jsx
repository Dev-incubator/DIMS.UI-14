import React from 'react';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import noop from '../shared/noop';
import Button from '../components/Button/Button';
import classes from './UsersTracks.module.css';
import Modal from '../components/Modals/Modal';
import {
  TASKS,
  getElementDataFromCollection,
  createTrack,
  editTrack,
  deleteTrack,
  getTracks,
} from '../utilities/fb-helpers';
import Track from '../components/Track/Track';
import { TRACKS_MODAL_CREATE_TRACK, TRACKS_MODAL_TOGGLE, reducerFunc } from './usersTracks-helpers';

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

    const taskData = await getElementDataFromCollection(TASKS, taskId);
    const tracks = await getTracks(userId, taskId);
    this.setState({ userId, taskId, taskData, tracks });
  }

  openCreateModal = () => this.toggleModal(TRACKS_MODAL_CREATE_TRACK);

  async updateData() {
    const { userId, taskId } = this.state;
    const tracks = await getTracks(userId, taskId);
    this.setState({ tracks });
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
            <NavLink className={classes.navLink} to={`/main/users/${userId}/tasks`}>
              <Button onClick={noop}>Back</Button>
            </NavLink>
            <Button onClick={this.openCreateModal} roleClass='create'>
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
