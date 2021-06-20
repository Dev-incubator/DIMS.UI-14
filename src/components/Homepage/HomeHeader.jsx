import { NavLink } from 'react-router-dom';
import classes from './HomeHeader.module.css';
import logo from '../../icons/logo.svg';

export default function HomeHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt='logo' />
        <div className={classes.title}>HyperCube</div>
      </div>
      <div className={classes.navLinkMenu}>
        <NavLink className={classes.navLinkItem} to='/about' activeClassName={classes.active}>
          About
        </NavLink>
        <NavLink className={classes.navLinkItem} exact to='/login' activeClassName={classes.active}>
          Login
        </NavLink>
      </div>
    </header>
  );
}
