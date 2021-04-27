import PropType from 'prop-types';
import classes from './Header.module.css';
import Hamburger from './Hamburger/Hamburger';

export default function Header({ toggleMenu, isOpen }) {
  return (
    <header className={classes.header}>
      <Hamburger onClick={toggleMenu} isOpen={isOpen} />
      <h1 className={classes.title}>HyperCube Managment System</h1>
    </header>
  );
}

Header.propTypes = {
  toggleMenu: PropType.func.isRequired,
  isOpen: PropType.bool.isRequired,
};
