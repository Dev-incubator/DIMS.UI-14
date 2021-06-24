import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './UserTask.module.css';
import Button from '../Button/Button';
import { getInternationalDate } from '../../utilities/internationalization';

export default function UserTask({ userId, taskId, tableIndex, status, isUser, startDate, deadLine, title, actFunc }) {
  const liftUpChangeStatus = (newStatus) => actFunc(taskId, newStatus);
  const handleFail = () => liftUpChangeStatus('Failed');
  const handleComplete = () => (status === 'Active' ? liftUpChangeStatus('Completed') : liftUpChangeStatus('Active'));
  const isFailed = status === 'Failed';
  const isActive = status === 'Active';

  const buttonGroup = isUser ? (
    <NavLink className={classes.navLink} to={`/main/users/${userId}/tasks/${taskId}/track`}>
      <Button onClick={actFunc}>Tracks</Button>
    </NavLink>
  ) : (
    <>
      <Button roleClass={isActive ? 'create' : null} onClick={handleComplete}>
        {isActive ? 'Complete' : 'reActive'}
      </Button>
      <Button roleClass='delete' disabled={isFailed} onClick={handleFail}>
        Fail
      </Button>
    </>
  );

  return (
    <div className={classes.item}>
      <div>{tableIndex}</div>
      <div>{title}</div>
      <div>{getInternationalDate(startDate)}</div>
      <div>{getInternationalDate(deadLine)}</div>
      <div className={classes[status]}>{status}</div>
      <div className={classes.buttons}>{buttonGroup}</div>
    </div>
  );
}

UserTask.propTypes = {
  tableIndex: PropTypes.number.isRequired,
  isUser: PropTypes.bool.isRequired,
  taskId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  deadLine: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  actFunc: PropTypes.func.isRequired,
};
