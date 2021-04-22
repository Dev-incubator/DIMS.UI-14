import PropType from 'prop-types';
import classes from './DeleteUser.module.css';
import Button from '../../Button/Button';

export default function DeleteUser({ user, dispatch, localActionTypes }) {
  const { modal, deleteUser } = localActionTypes;

  const closeDeleteModal = () => {
    dispatch({ type: modal });
  };

  const deleteCurrentUser = () => {
    dispatch({ type: deleteUser });
  };

  return (
    <div className={classes.modal}>
      <h3>Delete Member</h3>
      <div className={classes.text}>
        Are you really want to delete <br /> <span>{user.fullname}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={deleteCurrentUser} roleclass='delete'>
          Delete
        </Button>
        <Button onClick={closeDeleteModal}>Close</Button>
      </div>
    </div>
  );
}

DeleteUser.propTypes = {
  user: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
  localActionTypes: PropType.instanceOf(Object).isRequired,
};
