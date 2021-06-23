import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toggleMenu from '../../../../store/actionCreators/toggleMenu';
import classes from './Hamburger.module.css';

const Hamburger = ({ isOpen, toggleMenu }) => {
  const className = isOpen ? `${classes.hamburger} ${classes.active}` : `${classes.hamburger}`;

  return (
    <div tabIndex={0} role='button' className={className} onClick={toggleMenu} onKeyDown={toggleMenu}>
      <span />
      <span />
      <span />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.menu.isOpen,
  };
};

const mapDispatchToProps = {
  toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);

Hamburger.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
