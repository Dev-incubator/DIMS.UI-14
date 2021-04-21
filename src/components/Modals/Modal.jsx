import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteUser from './Users/DeleteUser';
import DeleteTask from './Tasks/DeleteTask';

export default function Modal({ modalTypes, actionTypes, dispatch, list, modalSettings }) {
  let modal;
  const { isOpen, selectedID, selectedModal } = modalSettings;
  const { deleteUser, deleteTask } = modalTypes;
  switch (selectedModal) {
    case deleteUser:
      modal = <DeleteUser usersList={list} dispatch={dispatch} selectedID={selectedID} actionTypes={actionTypes} />;
      break;
    case deleteTask:
      modal = <DeleteTask tasksList={list} dispatch={dispatch} selectedID={selectedID} actionTypes={actionTypes} />;
      break;
    default:
      break;
  }

  return <div className={`${classes.overlay} ${isOpen ? '' : classes.hidden}`}>{modal}</div>;
}

Modal.propTypes = {
  modalSettings: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
  list: PropType.instanceOf(Array).isRequired,
  actionTypes: PropType.instanceOf(Object).isRequired,
  modalTypes: PropType.instanceOf(Object).isRequired,
};
