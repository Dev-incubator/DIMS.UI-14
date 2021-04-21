import PropType from 'prop-types';
import classes from './DeleteUser.module.css';
import Button from '../../Button/Button';

export default function DeleteUser({ usersList, dispatch, selectedID, actionTypes }) {
  const { toggleModal, deleteUser } = actionTypes;

  const selectedUser = usersList.find((item) => item.id === selectedID);

  const deleteUserFunc = () => {
    dispatch({ type: deleteUser });
    closeDeleteModal();
  };

  const closeDeleteModal = () => {
    dispatch({ type: toggleModal });
  };

  return (
    <div className={classes.modal}>
      <h3>Delete Member</h3>
      <div className={classes.text}>
        Are you really want to delete <br /> <span>{selectedUser.fullname}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={deleteUserFunc} roleclass='delete'>
          Delete
        </Button>
        <Button onClick={closeDeleteModal}>Close</Button>
      </div>
    </div>
  );
}

DeleteUser.propTypes = {
  dispatch: PropType.func.isRequired,
  selectedID: PropType.number.isRequired,
  actionTypes: PropType.instanceOf(Object).isRequired,
  usersList: PropType.instanceOf(Array).isRequired,
};
