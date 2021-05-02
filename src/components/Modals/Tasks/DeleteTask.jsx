import PropType from 'prop-types';
import classes from './DeleteTask.module.css';
import Button from '../../Button/Button';

export default function DeleteTask({ task, closeFunc, actFunc }) {
  return (
    <div className={classes.modal}>
      <h3>Delete Task</h3>
      <div className={classes.text}>
        Are you really want to delete task <br /> <span>{task.title}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={actFunc} roleclass='delete'>
          Delete
        </Button>
        <Button onClick={closeFunc}>Close</Button>
      </div>
    </div>
  );
}

DeleteTask.propTypes = {
  task: PropType.instanceOf(Object).isRequired,
  actFunc: PropType.func.isRequired,
  closeFunc: PropType.func.isRequired,
};
