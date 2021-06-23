import PropTypes from 'prop-types';
import classes from './DeleteTask.module.css';
import Button from '../../Button/Button';

export default function DeleteTask({ task, closeFunc, liftUpDeleteTask }) {
  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Delete Task</h3>
      <div className={classes.text}>
        Are you really want to delete task <br /> <span>{task.title}</span> ?
      </div>
      <div className={classes.buttons}>
        <Button onClick={liftUpDeleteTask} roleClass='delete'>
          Delete
        </Button>
        <Button onClick={closeFunc}>Close</Button>
      </div>
    </div>
  );
}

DeleteTask.propTypes = {
  task: PropTypes.instanceOf(Object).isRequired,
  liftUpDeleteTask: PropTypes.func.isRequired,
  closeFunc: PropTypes.func.isRequired,
};
