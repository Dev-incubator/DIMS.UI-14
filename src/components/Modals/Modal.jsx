import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteUser from './Users/DeleteUser';
import DeleteTask from './Tasks/DeleteTask';
import CreateUser from './Users/CreateUser';

export default function Modal({ modalTypes, dispatch, item, modalSettingsAndActionTypes }) {
  let modal;

  const { isOpen, selectedModal, localActionTypes } = modalSettingsAndActionTypes;

  const { deleteUser, deleteTask, createUser } = modalTypes;

  switch (selectedModal) {
    case deleteUser:
      modal = <DeleteUser user={item} dispatch={dispatch} localActionTypes={localActionTypes} />;
      break;
    case deleteTask:
      modal = <DeleteTask task={item} dispatch={dispatch} localActionTypes={localActionTypes} />;
      break;
    case createUser:
      modal = <CreateUser dispatch={dispatch} localActionTypes={localActionTypes} />;
      break;
    default:
      break;
  }

  return <div className={`${classes.overlay} ${isOpen ? '' : classes.hidden}`}>{modal}</div>;
}

Modal.propTypes = {
  item: PropType.instanceOf(Object),
  dispatch: PropType.func.isRequired,
  modalSettingsAndActionTypes: PropType.instanceOf(Object).isRequired,
  modalTypes: PropType.instanceOf(Object).isRequired,
};

Modal.defaultProps = {
  item: {},
};
