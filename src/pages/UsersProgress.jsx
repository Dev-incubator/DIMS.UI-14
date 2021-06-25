import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UsersProgress.module.css';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import noop from '../shared/noop';
import SimpleTrack from '../components/Track/SimpleTrack';
import { createUserFullName, getAllTracksWithTaskTitle, getUserDataById } from '../store/store-helpers';

class UsersProgress extends React.PureComponent {
  render() {
    const { allTracks, userFullName, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    const trackItems = allTracks.map((track, index) => {
      return (
        <SimpleTrack
          tableIndex={index + 1}
          key={track.id}
          note={track.note}
          title={track.title}
          date={track.date}
          name={track.name}
        />
      );
    });

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {`${userFullName}'s Progress `}
            <span>({`${allTracks.length}`})</span>
          </h2>
          <NavLink className={classes.navLink} to='/main/users'>
            <Button onClick={noop} onScreen>
              Back
            </Button>
          </NavLink>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Task Name</div>
            <div>Track Name</div>
            <div>Track Note</div>
            <div>Date</div>
          </div>
          {trackItems}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { userId },
    },
  } = ownProps;
  if (!state.users.usersList.length || !state.tasks.tasksList.length) {
    return {
      tasksList: [],
      loading: state.app.loading,
      userFullName: '',
      allTracks: [],
    };
  }
  const userData = getUserDataById(state, userId);
  const userFullName = createUserFullName(userData);
  const allTracks = getAllTracksWithTaskTitle(state, userData);

  return {
    tasksList: state.tasks.tasksList,
    loading: state.app.loading,
    userFullName,
    allTracks,
  };
};

export default connect(mapStateToProps, null)(UsersProgress);

UsersProgress.propTypes = {
  loading: PropTypes.bool.isRequired,
  userFullName: PropTypes.string.isRequired,
  allTracks: PropTypes.instanceOf(Array).isRequired,
};
