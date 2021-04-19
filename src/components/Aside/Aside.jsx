import PropType from 'prop-types';
import Menu from './Menu/Menu';
import classes from './Aside.module.css';

export default function Aside({
  settings: {
    menu: { isOpen },
  },
}) {
  return (
    <aside className={`${classes.aside} ${isOpen ? classes.active : ''}`}>
      <Menu />
    </aside>
  );
}

Aside.propTypes = {
  settings: PropType.instanceOf(Object).isRequired,
};
