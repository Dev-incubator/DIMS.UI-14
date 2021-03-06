import PropTypes from 'prop-types';
import classes from './ShowTask.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { getInternationalDate } from '../../../utilities/internationalization';

export default function ShowTask({ task, closeFunc, usersList }) {
  const { title, startDate, description, deadLine, selectedUsers } = task;

  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Task Details</h3>
      <form>
        <div className={classes.wrapper}>
          <CraftInput title='Title' value={title} readOnly />
          <CraftInput title='Description' value={description} readOnly />
          <CraftInput title='Start Date' value={getInternationalDate(startDate)} readOnly />
          <CraftInput title='DeadLine' value={getInternationalDate(deadLine)} readOnly />
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
  task: PropTypes.instanceOf(Object).isRequired,
  closeFunc: PropTypes.func.isRequired,
  usersList: PropTypes.instanceOf(Array).isRequired,
};
