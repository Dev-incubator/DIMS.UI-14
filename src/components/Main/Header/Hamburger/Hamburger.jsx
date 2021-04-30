import PropType from 'prop-types';
import classes from './Hamburger.module.css';

export default function Hamburger({ onClick, isOpen }) {
  return (
    <div
      tabIndex={0}
      role='button'
      className={`${classes.hamburger} ${isOpen ? classes.active : ''}`}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

Hamburger.propTypes = {
  onClick: PropType.func.isRequired,
  isOpen: PropType.bool.isRequired,
};
