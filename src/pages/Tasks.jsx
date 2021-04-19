import PropType from 'prop-types';
import Button from '../components/Button/Button';
import classes from './Tasks.module.css';
import Task from '../components/Task/Task';

export default function Tasks({ tasksList }) {
  const tasks = tasksList.map((task) => {
    return (
      <Task
        key={task.id.toString()}
        id={task.id}
        taskName={task.taskName}
        description={task.description}
        startDate={task.startDate}
        deadline={task.deadline}
      />
    );
  });

  return (
    <div>
      <div className={classes.header}>
        <h2 className={classes.title}>
          Tasks <span>({`${tasksList.length}`})</span>
        </h2>
        <Button>Create</Button>
      </div>
      <div className={classes.content}>
        <div className={classes.subheader}>
          <div>№</div>
          <div>Task Name</div>
          <div>Description</div>
          <div>Start Date</div>
          <div>Deadline</div>
          <div>Controls</div>
        </div>
        {tasks}
      </div>
    </div>
  );
}

Tasks.propTypes = {
  tasksList: PropType.instanceOf(Array).isRequired,
};
