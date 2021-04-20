import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './User.module.css';

export default function User({ userData, dispatch, modalSettings, tableIndex }) {
  const { id, fullname, direction, education, start, age } = userData;

  const {
    toggler,
    types: { memberDelete, selectID },
  } = modalSettings;

  const toggleDeleteModal = () => {
    dispatch({ type: toggler, modaltype: memberDelete });
    dispatch({ type: selectID, id });
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
        <Button roleclass='delete' onClick={toggleDeleteModal}>
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
  tableIndex: PropType.number.isRequired,
};
