import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteUser from './Users/DeleteUser/DeleteUser';
import DeleteTask from './Tasks/DeleteTask';
import CreateUser from './Users/CreateUser/CreateUser';
import noop from '../../shared/noop';
import { USER_MODAL_DELETE_USER } from '../User/User-helpers';
import { TASK_MODAL_DELETE_TASK } from '../Task/Task-helpers';
import { USERS_MODAL_CREATE_USER } from '../../pages/Users-helpers';

export default function Modal({ item, selectedModal, closeFunc, actFunc }) {
  let modal;

  switch (selectedModal) {
    case USER_MODAL_DELETE_USER:
      modal = <DeleteUser user={item} closeFunc={closeFunc} actFunc={actFunc} />;
      break;
    case TASK_MODAL_DELETE_TASK:
      modal = <DeleteTask task={item} closeFunc={closeFunc} actFunc={actFunc} />;
      break;
    case USERS_MODAL_CREATE_USER:
      modal = <CreateUser closeFunc={closeFunc} actFunc={actFunc} />;
      break;
    default:
      break;
  }

  return <div className={classes.overlay}>{modal}</div>;
}

Modal.propTypes = {
  item: PropType.instanceOf(Object),
  closeFunc: PropType.func.isRequired,
  actFunc: PropType.func,
  selectedModal: PropType.string.isRequired,
};

Modal.defaultProps = {
  item: {},
  actFunc: noop,
};
