import PropTypes from 'prop-types';
import classes from './GoogleButton.module.css';
import googleLogo from '../../icons/google.svg';

export default function GoogleButton({ children, onClick }) {
  return (
    <button className={classes.googleButton} type='button' onClick={onClick}>
      <img className={classes.googleImg} src={googleLogo} alt='google-log' />
      <div>{children}</div>
    </button>
  );
}

GoogleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};
GoogleButton.defaultProps = {
  children: null,
};
