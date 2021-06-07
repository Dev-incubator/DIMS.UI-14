import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';
import classes from './MenuItem.module.css';

export default function MenuItem({ title, path, image }) {
  return (
    <NavLink className={classes.item} exact to={path} activeClassName={classes.active}>
      <img className={classes.image} src={image} alt='menu-logo' />
      <div className={classes.title}>{title}</div>
    </NavLink>
  );
}

MenuItem.propTypes = {
  title: PropType.string.isRequired,
  path: PropType.string.isRequired,
  image: PropType.string.isRequired,
};
