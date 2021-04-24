import PropType from 'prop-types';
import classes from './Validator.module.css';

export default function Validator({ error }) {
  if (error.length > 0) {
    return <div className={classes.validator}>{error}</div>;
  }

  return null;
}

Validator.propTypes = {
  error: PropType.string.isRequired,
};
