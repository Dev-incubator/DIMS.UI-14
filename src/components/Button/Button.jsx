import PropTypes from 'prop-types';
import classes from './Button.module.css';

export default function Button({ children, onClick, modalSettings, roletag, type }) {
  const { toggler } = modalSettings;
  const handleClick = () => onClick({ type: toggler, modaltype: type }); // default type = ''

  return (
    <button className={`${classes.button} ${roletag ? classes[roletag] : ''}`} type='button' onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  roletag: PropTypes.string,
  modalSettings: PropTypes.instanceOf(Object),
  type: PropTypes.string,
};
Button.defaultProps = {
  children: null,
  roletag: '',
  type: '',
  modalSettings: Object,
};
