import PropType from 'prop-types';
import classes from './SimpleTrack.module.css';
import { getInternationalDate } from '../../utilities/internationalization';

export default function SimpleTrack({ tableIndex, note, name, date, title }) {
  return (
    <div className={classes.item}>
      <div>{tableIndex}</div>
      <div>{title}</div>
      <div>{name}</div>
      <div>{note}</div>
      <div>{getInternationalDate(date)}</div>
    </div>
  );
}

SimpleTrack.propTypes = {
  tableIndex: PropType.number.isRequired,
  note: PropType.string.isRequired,
  name: PropType.string.isRequired,
  date: PropType.string.isRequired,
  title: PropType.string.isRequired,
};
