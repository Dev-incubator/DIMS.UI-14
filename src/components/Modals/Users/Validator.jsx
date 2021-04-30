import PropType from 'prop-types';
import classes from './Validator.module.css';

export default function Validator({ error }) {
  return error.length ? <div className={classes.validator}>{error}</div> : null;
}

Validator.propTypes = {
  error: PropType.string.isRequired,
};
