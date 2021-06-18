import PropTypes from 'prop-types';
import classes from './ThemeButton.module.css';
import moonLogo from '../../icons/moon.svg';
import sunLogo from '../../icons/sun.svg';
import { THEMES } from '../../utilities/enums';

const ThemeButton = ({ children, onClick, isActive }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={isActive ? `${classes.item} ${classes.active}` : `${classes.item}`}
    >
      <span>{children}</span>
      <img className={classes.img} src={children === THEMES.DARK ? moonLogo : sunLogo} alt='themeButton-logo' />
    </button>
  );
};

export default ThemeButton;

ThemeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  isActive: PropTypes.bool,
};

ThemeButton.defaultProps = {
  children: null,
  isActive: false,
};
