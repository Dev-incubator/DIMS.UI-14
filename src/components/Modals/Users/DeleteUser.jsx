import PropTypes from 'prop-types';
import classes from './DeleteUser.module.css';
import Button from '../../Button/Button';

export default function DeleteUser({ user, closeFunc, liftUpDeleteUser }) {
  const { username, surname } = user;

  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Delete Member</h3>
      <div className={classes.text}>
        Are you really want to delete <br />
        <span>
          {username} {surname}
        </span>
        ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={liftUpDeleteUser} roleClass='delete'>
          Delete
        </Button>
        <Button onClick={closeFunc}>Close</Button>
      </div>
    </div>
  );
}

DeleteUser.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  liftUpDeleteUser: PropTypes.func.isRequired,
  closeFunc: PropTypes.func.isRequired,
};
