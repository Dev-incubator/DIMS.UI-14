import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './Aside.module.css';
import MenuWithContext from '../ContextHOCs/MenuWithContext';

const Aside = ({ isOpen }) => {
  return (
    <aside className={isOpen ? `${classes.aside} ${classes.active}` : `${classes.aside}`}>
      <MenuWithContext />
    </aside>
  );
};

export default connect(({ menu: { isOpen } }) => ({ isOpen }), null)(Aside);

Aside.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
