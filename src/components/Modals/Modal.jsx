import PropType from 'prop-types';
import classes from './Modal.module.css';
import DeleteUser from './Users/DeleteUser';
import CreateUser from './Users/CreateUser';
import CreateTask from './Tasks/CreateTask';
import ShowUser from './Users/ShowUser';
import ShowTask from './Tasks/ShowTask';
import EditUser from './Users/EditUser';
import EditTask from './Tasks/EditTask';
import DeleteTask from './Tasks/DeleteTask';
import CreateTrack from './Tracks/CreateTrack';
import EditTrack from './Tracks/EditTrack';
import DeleteTrack from './Tracks/DeleteTrack';
import noop from '../../shared/noop';

import { USER_MODAL_DELETE_USER, USER_MODAL_EDIT_USER, USER_MODAL_SHOW_USER } from '../User/User-helpers';
import { USERS_MODAL_CREATE_USER } from '../../pages/Users-helpers';
import { TASKS_MODAL_CREATE_TASK } from '../../pages/Tasks-helpers';
import { TASK_MODAL_DELETE_TASK, TASK_MODAL_SHOW_TASK, TASK_MODAL_EDIT_TASK } from '../Task/Task-helpers';
import { TRACKS_MODAL_CREATE_TRACK } from '../../pages/UsersTracks-helpers';
import { TRACK_MODAL_EDIT_TRACK, TRACK_MODAL_DELETE_TRACK } from '../Track/Track-helpers';

export default function Modal({ item, list, selectedModal, closeFunc, actFunc }) {
  let modal;

  switch (selectedModal) {
    case USER_MODAL_DELETE_USER:
      modal = <DeleteUser user={item} closeFunc={closeFunc} liftUpDeleteUser={actFunc} />;
      break;
    case USER_MODAL_EDIT_USER:
      modal = <EditUser user={item} closeFunc={closeFunc} liftUpEditUser={actFunc} />;
      break;
    case USER_MODAL_SHOW_USER:
      modal = <ShowUser user={item} closeFunc={closeFunc} />;
      break;
    case TASK_MODAL_DELETE_TASK:
      modal = <DeleteTask task={item} closeFunc={closeFunc} liftUpDeleteTask={actFunc} />;
      break;
    case USERS_MODAL_CREATE_USER:
      modal = <CreateUser closeFunc={closeFunc} liftUpCreateUser={actFunc} />;
      break;
    case TASKS_MODAL_CREATE_TASK:
      modal = <CreateTask closeFunc={closeFunc} liftUpCreateTask={actFunc} usersList={list} />;
      break;
    case TASK_MODAL_SHOW_TASK:
      modal = <ShowTask task={item} usersList={list} closeFunc={closeFunc} />;
      break;
    case TASK_MODAL_EDIT_TASK:
      modal = <EditTask task={item} usersList={list} closeFunc={closeFunc} liftUpEditTask={actFunc} />;
      break;
    case TRACKS_MODAL_CREATE_TRACK:
      modal = <CreateTrack task={item} closeFunc={closeFunc} liftUpCreateTrack={actFunc} />;
      break;
    case TRACK_MODAL_EDIT_TRACK:
      modal = <EditTrack track={item} closeFunc={closeFunc} liftUpEditTrack={actFunc} />;
      break;
    case TRACK_MODAL_DELETE_TRACK:
      modal = <DeleteTrack track={item} closeFunc={closeFunc} liftUpDeleteTrack={actFunc} />;
      break;
    default:
      break;
  }

  return <div className={classes.overlay}>{modal}</div>;
}

Modal.propTypes = {
  item: PropType.instanceOf(Object),
  list: PropType.instanceOf(Array),
  closeFunc: PropType.func.isRequired,
  actFunc: PropType.func,
  selectedModal: PropType.string.isRequired,
};

Modal.defaultProps = {
  list: [],
  item: {},
  actFunc: noop,
};
