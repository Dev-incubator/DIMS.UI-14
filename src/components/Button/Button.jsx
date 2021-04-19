import PropTypes from 'prop-types';
import noop from '../../shared/noop';
import classes from './Button.module.css';

export default function Button({ children, onClick, toggler, type, roletag }) {
  const handleClick = () => onClick({ type: toggler, modaltype: type });

  return (
    <button className={`${classes.button} ${roletag ? classes[roletag] : ''}`} type='button' onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  roletag: PropTypes.string,
  toggler: PropTypes.string,
  type: PropTypes.string,
};
Button.defaultProps = {
  onClick: noop,
  children: null,
  roletag: '',
  toggler: '',
  type: '',
};
