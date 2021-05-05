import PropType from 'prop-types';
import classes from './ShowTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { intDate } from '../../../utilities/internationalization';

export default function ShowTask({ task, closeFunc, usersList }) {
  const { title, startDate, description, deadLine, selectedUsers } = task;

  return (
    <div className={classes.modal}>
      <h3>Task Details</h3>
      <form>
        <div className={classes.wrapper}>
          <CraftInput title='Title' value={title} readOnly />
          <CraftInput title='Description' value={description} readOnly />
          <CraftInput title='Start Date' value={intDate(startDate)} readOnly />
          <CraftInput title='DeadLine' value={intDate(deadLine)} readOnly />
          <CraftInput title='Users' type='checkbox' options={usersList} value={selectedUsers} readOnly />
        </div>
        <div className={classes.buttons}>
          <Button onClick={closeFunc}>Close</Button>
        </div>
      </form>
    </div>
  );
}

ShowTask.propTypes = {
  task: PropType.instanceOf(Object).isRequired,
  closeFunc: PropType.func.isRequired,
  usersList: PropType.instanceOf(Array).isRequired,
};
