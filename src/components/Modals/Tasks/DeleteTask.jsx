import PropType from 'prop-types';
import classes from './DeleteTask.module.css';
import Button from '../../Button/Button';

export default function DeleteTask({ task, dispatch, localActionTypes }) {
  const { modal, deleteTask } = localActionTypes;

  const closeDeleteModal = () => {
    dispatch({ type: modal });
  };

  const deleteCurrentTask = () => {
    dispatch({ type: deleteTask });
  };

  return (
    <div className={classes.modal}>
      <h3>Delete Task</h3>
      <div className={classes.text}>
        Are you really want to delete task <br /> <span>{task.taskName}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={deleteCurrentTask} roleclass='delete'>
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
  localActionTypes: PropType.instanceOf(Object).isRequired,
};
