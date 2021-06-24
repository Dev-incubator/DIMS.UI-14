import PropTypes from 'prop-types';
import classes from './Validator.module.css';

export default function Validator({ error }) {
  return error.length ? <div className={classes.validator}>{error}</div> : null;
}

Validator.propTypes = {
  error: PropTypes.string.isRequired,
};
