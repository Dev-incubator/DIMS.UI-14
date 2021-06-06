import PropType from 'prop-types';
import { connect } from 'react-redux';
import Menu from './Menu/Menu';
import classes from './Aside.module.css';
import { UserContext } from '../../App/userContext';

const Aside = ({ isOpen }) => {
  const className = isOpen ? `${classes.aside} ${classes.active}` : `${classes.aside}`;
  return (
    <aside className={className}>
      <UserContext.Consumer>{(userContext) => <Menu {...userContext} />}</UserContext.Consumer>
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
