import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UserTask.module.css';
import Button from '../Button/Button';
import { internationalizeDate } from '../../utilities/internationalization';

export default function UserTask({ userID, taskID, tableIndex, status, isUser, startDate, deadLine, title, actFunc }) {
  const liftUpChangeStatus = (newStatus) => actFunc(taskID, newStatus);
  const handleFail = () => liftUpChangeStatus('Failed');
  const handleComplete = () => (status === 'Active' ? liftUpChangeStatus('Completed') : liftUpChangeStatus('Active'));

  const buttonGroup = isUser ? (
    <NavLink className={classes.navLink} to={`/users/${userID}/tasks/${taskID}/track`}>
      <Button onClick={actFunc}>Create</Button>
    </NavLink>
  ) : (
    <>
      <Button roleClass={status === 'Active' ? 'create' : null} onClick={handleComplete}>
        {status === 'Active' ? 'Complete' : 'reActive'}
      </Button>
      <Button roleClass='delete' disabled={status === 'Failed'} onClick={handleFail}>
        Fail
      </Button>
    </>
  );

  return (
    <div className={classes.item}>
      <div>{tableIndex}</div>
      <div>{title}</div>
      <div>{internationalizeDate(startDate)}</div>
      <div>{internationalizeDate(deadLine)}</div>
      <div className={classes[status]}>{status}</div>
      <div className={classes.buttons}>{buttonGroup}</div>
    </div>
  );
}

UserTask.propTypes = {
  tableIndex: PropType.number.isRequired,
  isUser: PropType.bool.isRequired,
  taskID: PropType.string.isRequired,
  userID: PropType.string.isRequired,
  startDate: PropType.string.isRequired,
  deadLine: PropType.string.isRequired,
  title: PropType.string.isRequired,
  status: PropType.string.isRequired,
  actFunc: PropType.func.isRequired,
};
