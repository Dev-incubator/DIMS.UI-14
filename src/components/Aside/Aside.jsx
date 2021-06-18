import PropType from 'prop-types';
import classes from './Aside.module.css';
import MenuWithContext from '../ContextHOCs/MenuWithContext';

export default function Aside({ isOpen }) {
  return (
    <aside className={`${classes.aside} ${isOpen ? classes.active : null}`}>
      <MenuWithContext />
    </aside>
  );
}

Aside.propTypes = {
  isOpen: PropType.bool.isRequired,
};
