import PropType from 'prop-types';
import Menu from './Menu/Menu';
import classes from './Aside.module.css';
import { UserContext } from '../../App/userContext';

export default function Aside({ isOpen }) {
  return (
    <aside className={`${classes.aside} ${isOpen ? classes.active : null}`}>
      <UserContext.Consumer>{(userContext) => <Menu {...userContext} />}</UserContext.Consumer>
    </aside>
  );
}

Aside.propTypes = {
  isOpen: PropType.bool.isRequired,
};
