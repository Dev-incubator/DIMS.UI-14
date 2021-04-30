import PropType from 'prop-types';
import classes from './DeleteUser.module.css';
import Button from '../../Button/Button';

export default function DeleteUser({ user, closeFunc, actFunc }) {
  return (
    <div className={classes.modal}>
      <h3>Delete Member</h3>
      <div className={classes.text}>
        Are you really want to delete <br /> <span>{user.fullname}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={actFunc} roleclass='delete'>
          Delete
        </Button>
        <Button onClick={closeFunc}>Close</Button>
      </div>
    </div>
  );
}

DeleteUser.propTypes = {
  user: PropType.instanceOf(Object).isRequired,
  actFunc: PropType.func.isRequired,
  closeFunc: PropType.func.isRequired,
};
