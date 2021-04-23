import PropType from 'prop-types';
import Menu from './Menu/Menu';
import classes from './Aside.module.css';

export default function Aside({ menu: { isOpen } }) {
  return (
    <aside className={`${classes.aside} ${isOpen ? classes.active : ''}`}>
      <Menu />
    </aside>
  );
}

Aside.propTypes = {
  menu: PropType.instanceOf(Object).isRequired,
};
