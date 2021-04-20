import PropTypes from 'prop-types';
import classes from './Button.module.css';

export default function Button({ children, onClick, roleclass }) {
  return (
    <button className={`${classes.button} ${roleclass && classes[roleclass]}`} type='button' onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  roleclass: PropTypes.string,
};
Button.defaultProps = {
  children: null,
  roleclass: '',
};
