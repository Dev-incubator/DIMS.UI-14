import PropType from 'prop-types';
import classes from './DeleteTask.module.css';
import Button from '../../Button/Button';
import { closeAnyModal, deleteTask } from '../../../utilities/action-сreators';

export default function DeleteTask({ task, dispatch }) {
  const closeDeleteModal = () => {
    dispatch(closeAnyModal());
  };

  const deleteSelectedTask = () => {
    dispatch(deleteTask());
  };

  return (
    <div className={classes.modal}>
      <h3>Delete Task</h3>
      <div className={classes.text}>
        Are you really want to delete task <br /> <span>{task.taskName}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={deleteSelectedTask} roleclass='delete'>
          Delete
        </Button>
        <Button onClick={closeDeleteModal}>Close</Button>
      </div>
    </div>
  );
}

DeleteTask.propTypes = {
  task: PropType.instanceOf(Object).isRequired,
  dispatch: PropType.func.isRequired,
};
