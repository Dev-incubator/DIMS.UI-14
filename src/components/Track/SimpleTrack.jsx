import PropType from 'prop-types';
import classes from './SimpleTrack.module.css';
import { internationalizeDate } from '../../utilities/internationalization';

export default function SimpleTrack({ tableIndex, note, date, title }) {
  return (
    <div className={classes.item}>
      <div>{tableIndex}</div>
      <div>{title}</div>
      <div>{note}</div>
      <div>{internationalizeDate(date)}</div>
    </div>
  );
}

SimpleTrack.propTypes = {
  tableIndex: PropType.number.isRequired,
  note: PropType.string.isRequired,
  date: PropType.string.isRequired,
  title: PropType.string.isRequired,
};
