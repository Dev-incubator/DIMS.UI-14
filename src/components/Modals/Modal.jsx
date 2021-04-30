import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteUser from './Users/DeleteUser';
import CreateUser from './Users/CreateUser';
import ShowUser from './Users/ShowUser';
import EditUser from './Users/EditUser';
import DeleteTask from './Tasks/DeleteTask';
import noop from '../../shared/noop';

import { USER_MODAL_DELETE_USER, USER_MODAL_EDIT_USER, USER_MODAL_SHOW_USER } from '../User/User-helpers';
import { USERS_MODAL_CREATE_USER } from '../../pages/Users-helpers';
import { TASK_MODAL_DELETE_TASK } from '../Task/Task-helpers';

export default function Modal({ item, selectedModal, closeFunc, actFunc }) {
  let modal;

  switch (selectedModal) {
    case USER_MODAL_DELETE_USER:
      modal = <DeleteUser user={item} closeFunc={closeFunc} actFunc={actFunc} />;
      break;
    case USER_MODAL_EDIT_USER:
      modal = <EditUser user={item} closeFunc={closeFunc} actFunc={actFunc} />;
      break;
    case USER_MODAL_SHOW_USER:
      modal = <ShowUser user={item} closeFunc={closeFunc} />;
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
