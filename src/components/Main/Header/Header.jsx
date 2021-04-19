import PropType from 'prop-types';
import classes from './Header.module.css';
import Hamburger from './Hamburger/Hamburger';

export default function Header({ dispatch, menu }) {
  return (
    <header className={classes.header}>
      <Hamburger dispatch={dispatch} menu={menu} />
      <h1 className={classes.title}>HyperCube Managment System</h1>
    </header>
  );
}

Header.propTypes = {
  dispatch: PropType.func.isRequired,
  menu: PropType.instanceOf(Object).isRequired,
};
