import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import noop from '../shared/noop';
import Button from '../components/Button/Button';
import classes from './UsersTracks.module.css';
import Modal from '../components/Modals/Modal';
import { createTrack, editTrack, deleteTrack } from '../utilities/fb-helpers';
import Track from '../components/Track/Track';
import Loader from '../components/Loader/Loader';
import openCreateTrackModal from '../store/actionCreators/openCreateTrackModal';
import toggleModal from '../store/actionCreators/toggleModal';
import fetchUsers from '../store/actionCreators/fetchUsers';
import { getTaskDataById, getTaskTracksById } from '../store/store-helpers';

class UsersTracks extends React.PureComponent {
  createTrack = (newTrack) => {
    const { userId, taskId, fetchUsers } = this.props;
    createTrack(userId, taskId, newTrack, fetchUsers);
  };

  editTrack = (editedTrack) => {
    const { userId, taskId, fetchUsers } = this.props;
    editTrack(userId, taskId, editedTrack, fetchUsers);
  };

  deleteTrack = (trackId) => {
    const { userId, taskId, fetchUsers } = this.props;
    deleteTrack(userId, taskId, trackId, fetchUsers);
  };

  render() {
    const {
      userId,
      taskData,
      app: { isModalOpen, loading, selectedModal },
      tracks,
      openCreateTrackModal,
      toggleModal,
    } = this.props;

    if (loading) {
      return <Loader />;
    }

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
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {`${taskData.title}'s task tracks`} <span>({`${tracks.length}`})</span>
          </h2>
          <div className={classes.buttonsWrapper}>
            <NavLink className={classes.navLink} to={`/main/users/${userId}/tasks`}>
              <Button onClick={noop}>Back</Button>
            </NavLink>
            <Button onClick={openCreateTrackModal} roleClass='create'>
              Create
            </Button>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Track Name</div>
            <div>Track Note</div>
            <div>Date</div>
            <div>Controls</div>
          </div>
          {tracksList}
        </div>
        {isModalOpen ? (
          <Modal item={taskData} closeFunc={toggleModal} actFunc={this.createTrack} selectedModal={selectedModal} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { userId, taskId },
    },
  } = ownProps;
  if (!state.users.usersList.length || !state.tasks.tasksList.length) {
    return {
      app: state.app,
      taskData: {},
      tracks: [],
      userId,
      taskId,
    };
  }
  const taskData = getTaskDataById(state, taskId);
  const tracks = getTaskTracksById(state, userId, taskId);

  return {
    app: state.app,
    taskData,
    tracks,
    userId,
    taskId,
  };
};

const mapDispatchToProps = {
  openCreateTrackModal,
  toggleModal,
  fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTracks);

UsersTracks.propTypes = {
  app: PropTypes.shape({
    isModalOpen: PropTypes.bool,
    selectedModal: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  taskData: PropTypes.instanceOf(Object).isRequired,
  tracks: PropTypes.instanceOf(Array).isRequired,
  toggleModal: PropTypes.func.isRequired,
  openCreateTrackModal: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};
