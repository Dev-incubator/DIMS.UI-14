import { useEffect } from 'react';
import PropType from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './UsersProgress.module.css';
import Button from '../components/Button/Button';
import Loader from '../components/Loader/Loader';
import noop from '../shared/noop';
import SimpleTrack from '../components/Track/SimpleTrack';
import fetchProgress from '../store/actionCreators/fetchProgress';

const UsersProgress = ({
  match: {
    params: { userId },
  },
}) => {
  const { allTracks, userFullName } = useSelector((state) => state.progress);
  const { loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProgress(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};

export default UsersProgress;

UsersProgress.propTypes = {
  match: PropType.instanceOf(Object).isRequired,
};
