import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';

export default function User({ dispatch, modalSettings, userData }) {
  const { id, fullname, direction, education, start, age } = userData;
  const {
    types: { memberDelete, memberProgress, memberEdit },
  } = modalSettings;

  return (
    <div className={classes.item}>
      <div>{id}</div>
      <div>{fullname}</div>
      <div>{direction}</div>
      <div>{education}</div>
      <div>{start}</div>
      <div>{age}</div>
      <div className={classes.buttons}>
        <Button modalSettings={modalSettings} type={memberProgress} onClick={dispatch}>
          Progress
        </Button>
        <Button modalSettings={modalSettings} onClick={dispatch}>
          Tasks
        </Button>
        <Button modalSettings={modalSettings} type={memberEdit} roletag='edit' onClick={dispatch}>
          Edit
        </Button>
        <Button selectedID={id} roletag='delete' modalSettings={modalSettings} type={memberDelete} onClick={dispatch}>
          Delete
        </Button>
      </div>
    </div>
  );
}

User.propTypes = {
  userData: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
  modalSettings: PropType.instanceOf(Object).isRequired,
};
