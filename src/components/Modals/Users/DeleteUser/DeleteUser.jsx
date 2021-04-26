import PropType from 'prop-types';
import classes from './DeleteUser.module.css';
import Button from '../../../Button/Button';
import { closeAnyModal, deleteUser } from '../../../../utilities/action-сreators';

export default function DeleteUser({ user, dispatch }) {
  const closeDeleteModal = () => {
    dispatch(closeAnyModal());
  };
  const deleteSelectedUser = () => {
    dispatch(deleteUser());
  };

  return (
    <div className={classes.modal}>
      <h3>Delete Member</h3>
      <div className={classes.text}>
        Are you really want to delete <br /> <span>{user.fullname}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={deleteSelectedUser} roleclass='delete'>
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
};