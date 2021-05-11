import PropType from 'prop-types';
import classes from './UserTask.module.css';
import { internationalizeDate } from '../../utilities/internationalization';

export default function UserTask({ tableIndex, title, startDate, deadLine, status }) {
  return (
    <div className={classes.item}>
      <div>{tableIndex}</div>
      <div>{title}</div>
      <div>{internationalizeDate(startDate)}</div>
      <div>{internationalizeDate(deadLine)}</div>
      <div>{status}</div>
      <div className={classes.button}>kek</div>
    </div>
  );
}

UserTask.propTypes = {
  tableIndex: PropType.number.isRequired,
  title: PropType.string.isRequired,
  status: PropType.string.isRequired,
  startDate: PropType.string.isRequired,
  deadLine: PropType.string.isRequired,
};
