import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';

export default function User({
  modal: {
    toggler,
    types: { memberDelete },
  },
  dispatch,
  id,
  fullname,
  direction,
  education,
  start,
  age,
}) {
  return (
    <div className={classes.item}>
      <div>{id}</div>
      <div>{fullname}</div>
      <div>{direction}</div>
      <div>{education}</div>
      <div>{start}</div>
      <div>{age}</div>
      <div className={classes.buttons}>
        <Button>Progress</Button>
        <Button>Tasks</Button>
        <Button roletag='edit'>Edit</Button>
        <Button roletag='delete' toggler={toggler} type={memberDelete} onClick={dispatch}>
          Delete
        </Button>
      </div>
    </div>
  );
}

User.propTypes = {
  id: PropType.number.isRequired,
  fullname: PropType.string.isRequired,
  direction: PropType.string.isRequired,
  education: PropType.string.isRequired,
  start: PropType.string.isRequired,
  age: PropType.number.isRequired,
  dispatch: PropType.func.isRequired,
  modal: PropType.instanceOf(Object).isRequired,
};
