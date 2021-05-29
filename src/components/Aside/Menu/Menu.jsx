import PropType from 'prop-types';
import classes from './Menu.module.css';
import logo from '../../../icons/logo.svg';
import logoutIcon from '../../../icons/logout.svg';
import { getRoleDependedMenuLinks } from '../../Routes';

export default function Menu({ loggedUser, setUserContext, isLogged }) {
  const handleClick = () => setUserContext({});
  const menuLinks = isLogged ? getRoleDependedMenuLinks(loggedUser) : null;

  return (
    <menu className={classes.menu}>
      <div className={classes.header}>
        <img src={logo} alt='logo' />
        <div className={classes.title}>HyperCube</div>
      </div>
      <nav>
        {menuLinks}
        <div role='button' tabIndex={0} className={classes.item} onKeyDown={handleClick} onClick={handleClick}>
          <img className={classes.image} src={logoutIcon} alt='logout-logo' />
          <div className={classes.itemTitle}>Logout</div>
        </div>
      </nav>
    </menu>
  );
}

Menu.propTypes = {
  setUserContext: PropType.func.isRequired,
  loggedUser: PropType.instanceOf(Object).isRequired,
  isLogged: PropType.bool.isRequired,
};
