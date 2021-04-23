import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteUser from './Users/DeleteUser';
import DeleteTask from './Tasks/DeleteTask';
import CreateUser from './Users/CreateUser';
import { CREATE_USER_MODAL, DELETE_USER_MODAL, DELETE_TASK_MODAL } from '../../utilities/actionCreators';

export default function Modal({ item, dispatch, settings }) {
  let modal;
  const { isOpen, selectedModal } = settings;

  switch (selectedModal) {
    case DELETE_USER_MODAL:
      modal = <DeleteUser user={item} dispatch={dispatch} />;
      break;
    case DELETE_TASK_MODAL:
      modal = <DeleteTask task={item} dispatch={dispatch} />;
      break;
    case CREATE_USER_MODAL:
      modal = <CreateUser dispatch={dispatch} />;
      break;
    default:
      break;
  }

  return <div className={`${classes.overlay} ${isOpen ? '' : classes.hidden}`}>{modal}</div>;
}

Modal.propTypes = {
  item: PropType.instanceOf(Object),
  dispatch: PropType.func.isRequired,
  settings: PropType.instanceOf(Object).isRequired,
};

Modal.defaultProps = {
  item: {},
};
