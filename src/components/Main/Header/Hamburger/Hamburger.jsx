// import PropType from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import toggleMenu from '../../../../store/actionCreators/toggleMenu';
import classes from './Hamburger.module.css';

const Hamburger = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(toggleMenu());
  const isOpen = useSelector((state) => state.menu.isOpen);

  const className = isOpen ? `${classes.hamburger} ${classes.active}` : `${classes.hamburger}`;

  return (
    <div tabIndex={0} role='button' className={className} onClick={handleClick} onKeyDown={handleClick}>
      <span />
      <span />
      <span />
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     isOpen: state.menu.isOpen,
//   };
// };

// const mapDispatchToProps = {
//   toggleMenu,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Hamburger);

export default Hamburger;

// Hamburger.propTypes = {
//   toggleMenu: PropType.func.isRequired,
//   isOpen: PropType.bool.isRequired,
// };
