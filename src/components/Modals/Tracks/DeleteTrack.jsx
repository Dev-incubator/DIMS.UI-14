import PropTypes from 'prop-types';
import classes from './DeleteTrack.module.css';
import Button from '../../Button/Button';

export default function DeleteTrack({ track, closeFunc, liftUpDeleteTrack }) {
  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Delete Track</h3>
      <div className={classes.text}>
        Are you really want to delete your track <span>{track.note}</span> from task <span>{track.title}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={liftUpDeleteTrack} roleClass='delete'>
          Delete
        </Button>
        <Button onClick={closeFunc}>Close</Button>
      </div>
    </div>
  );
}

DeleteTrack.propTypes = {
  track: PropTypes.shape({
    note: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  liftUpDeleteTrack: PropTypes.func.isRequired,
  closeFunc: PropTypes.func.isRequired,
};
