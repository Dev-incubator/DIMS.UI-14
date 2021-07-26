import classes from './Header.module.css';
import Hamburger from './Hamburger/Hamburger';

const Header = () => {
  return (
    <header className={classes.header}>
      <Hamburger />
      <h1 className={classes.title}>HyperCube Management System</h1>
    </header>
  );
};

export default Header;
