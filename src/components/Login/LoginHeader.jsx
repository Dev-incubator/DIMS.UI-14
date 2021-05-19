import { NavLink } from 'react-router-dom';
import classes from './LoginHeader.module.css';
import logo from '../../icons/logo.svg';

export default function LoginHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt='logo' />
        <div className={classes.title}>HyperCube</div>
      </div>
      <div className={classes.navLinkMenu}>
        <div className={classes.navLinkWrapper}>
          <NavLink className={classes.navLinkItem} to='/about' activeClassName={classes.active}>
            About
          </NavLink>
        </div>
        <div className={classes.navLinkWrapper}>
          <NavLink className={classes.navLinkItem} to='/' activeClassName={classes.active}>
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
}
