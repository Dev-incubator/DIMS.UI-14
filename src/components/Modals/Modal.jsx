import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteMember from './Members/DeleteMember';

export default function Modal({ dispatch, modal: { toggler, isOpen, type } }) {
  let modal;
  switch (type) {
    case 'member-delete':
      modal = <DeleteMember dispatch={dispatch} toggler={toggler} types={modal.types} />;
      break;
    default:
      console.log('Something with modal went wrong...');
  }

  return <div className={`${classes.overlay} ${isOpen ? '' : classes.hidden}`}>{modal}</div>;
}

Modal.propTypes = {
  modal: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
};
