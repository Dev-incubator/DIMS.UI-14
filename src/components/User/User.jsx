import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';

export default function User({ actionTypes, modalTypes, userData, tableIndex, dispatch }) {
  const { id, fullname, direction, education, start, age } = userData;

  const { deleteUser } = modalTypes;
  const { toggleModal } = actionTypes;

  const openDeleteModal = () => {
    dispatch({ type: toggleModal, modalType: deleteUser, selectedID: id });
  };

  return (
    <div className={classes.item}>
      <div>{tableIndex}</div>
      <div>{fullname}</div>
      <div>{direction}</div>
      <div>{education}</div>
      <div>{start}</div>
      <div>{age}</div>
      <div className={classes.buttons}>
        <Button onClick={() => {}}>Progress</Button>
        <Button onClick={() => {}}>Tasks</Button>
        <Button roleclass='edit' onClick={() => {}}>
          Edit
        </Button>
        <Button roleclass='delete' onClick={openDeleteModal}>
          Delete
        </Button>
      </div>
    </div>
  );
}

User.propTypes = {
  dispatch: PropType.func.isRequired,
  userData: PropType.instanceOf(Object).isRequired,
  tableIndex: PropType.number.isRequired,
  modalTypes: PropType.instanceOf(Object).isRequired,
  actionTypes: PropType.instanceOf(Object).isRequired,
};
