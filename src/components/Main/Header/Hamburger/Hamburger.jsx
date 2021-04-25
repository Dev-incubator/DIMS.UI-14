import PropType from 'prop-types';
import classes from './Hamburger.module.css';
import { toggleMenuAC } from '../../../../utilities/action-сreators';

export default function Hamburger({ dispatch, isOpen }) {
  const handleClick = () => dispatch(toggleMenuAC());

  return (
    <div
      tabIndex={0}
      role='button'
      className={`${classes.hamburger} ${isOpen ? classes.active : ''}`}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

Hamburger.propTypes = {
  dispatch: PropType.func.isRequired,
  isOpen: PropType.bool.isRequired,
};
