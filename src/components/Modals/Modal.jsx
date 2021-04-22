import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteUser from './Users/DeleteUser';
import DeleteTask from './Tasks/DeleteTask';

export default function Modal({ modalTypes, dispatch, item, modalSettingsAndActionTypes }) {
  let modal;

  const { isOpen, selectedModal, localActionTypes } = modalSettingsAndActionTypes;

  const { deleteUser, deleteTask } = modalTypes;

  switch (selectedModal) {
    case deleteUser:
      modal = <DeleteUser user={item} dispatch={dispatch} localActionTypes={localActionTypes} />;
      break;
    case deleteTask:
      modal = <DeleteTask task={item} dispatch={dispatch} localActionTypes={localActionTypes} />;
      break;
    default:
      break;
  }

  return <div className={`${classes.overlay} ${isOpen ? '' : classes.hidden}`}>{modal}</div>;
}

Modal.propTypes = {
  dispatch: PropType.func.isRequired,
  item: PropType.instanceOf(Object).isRequired,
  modalSettingsAndActionTypes: PropType.instanceOf(Object).isRequired,
  modalTypes: PropType.instanceOf(Object).isRequired,
};
