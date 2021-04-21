import PropType from 'prop-types';
import classes from './DeleteTask.module.css';
import Button from '../../Button/Button';

export default function DeleteTask({ tasksList, dispatch, selectedID, actionTypes }) {
  const { toggleModal, deleteTask } = actionTypes;

  const selectedTask = tasksList.find((item) => item.id === selectedID);

  const deleteTaskFunc = () => {
    dispatch({ type: deleteTask });
    closeDeleteModal();
  };

  const closeDeleteModal = () => {
    dispatch({ type: toggleModal });
  };

  return (
    <div className={classes.modal}>
      <h3>Delete Task</h3>
      <div className={classes.text}>
        Are you really want to delete task <br /> <span>{selectedTask.taskName}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={deleteTaskFunc} roleclass='delete'>
          Delete
        </Button>
        <Button onClick={closeDeleteModal}>Close</Button>
      </div>
    </div>
  );
}

DeleteTask.propTypes = {
  dispatch: PropType.func.isRequired,
  selectedID: PropType.number.isRequired,
  actionTypes: PropType.instanceOf(Object).isRequired,
  tasksList: PropType.instanceOf(Array).isRequired,
};
