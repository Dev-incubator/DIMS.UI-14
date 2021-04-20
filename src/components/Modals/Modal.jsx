import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteMember from './Members/DeleteMember';

export default function Modal({ usersList, dispatch, modalSettings }) {
  let modal;
  const { isOpen, type } = modalSettings;
  switch (type) {
    case 'member-delete':
      modal = <DeleteMember usersList={usersList} dispatch={dispatch} modalSettings={modalSettings} />;
      break;
    default:
      break;
  }

  return <div className={`${classes.overlay} ${isOpen ? '' : classes.hidden}`}>{modal}</div>;
}

Modal.propTypes = {
  modalSettings: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
  usersList: PropType.instanceOf(Array).isRequired,
};
