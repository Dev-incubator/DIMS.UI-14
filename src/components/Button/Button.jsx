import PropTypes from 'prop-types';
import classes from './Button.module.css';

export default function Button({ children, onClick, roleClass, disabled, onScreen }) {
  return (
    <button
      className={`${classes.button} ${roleClass && classes[roleClass]} ${onScreen && classes.onScreen}`}
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
  onScreen: PropTypes.bool,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  children: null,
  roleClass: '',
  disabled: false,
  onScreen: '',
};
