import PropType from 'prop-types';
import Button from '../Button/Button';
import classes from './Task.module.css';

export default function Task({ id, taskName, description, startDate, deadline }) {
  return (
    <div className={classes.item}>
      <div>{id}</div>
      <div>{taskName}</div>
      <div>{description}</div>
      <div>{startDate}</div>
      <div>{deadline}</div>
      <div className={classes.buttons}>
        <Button roletag='edit'>Edit</Button>
        <Button roletag='delete'>Delete</Button>
      </div>
    </div>
  );
}

Task.propTypes = {
  id: PropType.number.isRequired,
  taskName: PropType.string.isRequired,
  description: PropType.string.isRequired,
  startDate: PropType.string.isRequired,
  deadline: PropType.string.isRequired,
};
