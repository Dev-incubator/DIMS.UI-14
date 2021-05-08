import PropTypes from 'prop-types';
import classes from './Button.module.css';

export default function Button({ children, onClick, roleClass, disabled }) {
  return (
    <button
      className={`${classes.button} ${roleClass && classes[roleClass]}`}
      type='button'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  roleClass: PropTypes.string,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  children: null,
  roleClass: '',
  disabled: false,
};
