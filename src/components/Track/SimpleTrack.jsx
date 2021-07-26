import PropTypes from 'prop-types';
import classes from './SimpleTrack.module.css';
import { getInternationalDate } from '../../utilities/internationalization';

export default function SimpleTrack({ tableIndex, note, name, date, title }) {
  return (
    <div className={classes.item}>
      <div>№</div>
      <div>{tableIndex}</div>
      <div>Task Name</div>
      <div>{title}</div>
      <div>Task Name</div>
      <div>{name}</div>
      <div>Track Note</div>
      <div>{note}</div>
      <div>Date</div>
      <div>{getInternationalDate(date)}</div>
    </div>
  );
}

SimpleTrack.propTypes = {
  tableIndex: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
