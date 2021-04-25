import PropType from 'prop-types';
import Menu from './Menu/Menu';
import classes from './Aside.module.css';

export default function Aside({ isOpen }) {
  return (
    <aside className={`${classes.aside} ${isOpen ? classes.active : ''}`}>
      <Menu />
    </aside>
  );
}

Aside.propTypes = {
  isOpen: PropType.bool.isRequired,
};
