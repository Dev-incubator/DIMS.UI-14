import PropType from 'prop-types';
import { connect } from 'react-redux';
import classes from './Aside.module.css';
import MenuWithContext from '../ContextHOCs/MenuWithContext';

const Aside = ({ isOpen }) => {
  const className = isOpen ? `${classes.aside} ${classes.active}` : `${classes.aside}`;
  return (
    <aside className={className}>
      <MenuWithContext />
    </aside>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.menu.isOpen,
  };
};

export default connect(mapStateToProps, null)(Aside);

Aside.propTypes = {
  isOpen: PropType.bool.isRequired,
};
