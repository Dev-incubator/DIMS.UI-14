import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UsersProgress.module.css';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import noop from '../shared/noop';
import SimpleTrack from '../components/Track/SimpleTrack';
import fetchProgress from '../store/actionCreators/fetchProgress';

class UsersProgress extends React.PureComponent {
  componentDidMount() {
    const {
      fetchProgress,
      match: {
        params: { userId },
      },
    } = this.props;
    fetchProgress(userId);
  }

  render() {
    const { allTracks, userFullName, loading } = this.props;
    if (loading) return <Loader />;

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

const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
    userFullName: state.progress.userFullName,
    allTracks: state.progress.allTracks,
  };
};

export default connect(mapStateToProps, { fetchProgress })(UsersProgress);

UsersProgress.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
  loading: PropType.bool.isRequired,
  userFullName: PropType.string.isRequired,
  allTracks: PropType.instanceOf(Array).isRequired,
  fetchProgress: PropType.func.isRequired,
};
