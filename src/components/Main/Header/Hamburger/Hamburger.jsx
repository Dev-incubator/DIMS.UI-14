import PropType from 'prop-types';
import classes from './Hamburger.module.css';

export default function Hamburger({ dispatch, menu: { isOpen, toggler } }) {
  const handleClick = () => dispatch({ type: toggler });

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
  menu: PropType.instanceOf(Object).isRequired,
};
