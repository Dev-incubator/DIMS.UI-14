import PropType from 'prop-types';
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
  track: PropType.shape({
    note: PropType.string,
    title: PropType.string,
  }).isRequired,
  liftUpDeleteTrack: PropType.func.isRequired,
  closeFunc: PropType.func.isRequired,
};
