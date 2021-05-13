import PropTypes from 'prop-types';
import classes from './DivAnchor.module.css';

export default function DivAnchor({ children, onClick }) {
  return (
    <div role='button' className={classes.anchor} tabIndex={0} onKeyDown={onClick} onClick={onClick}>
      {children}
    </div>
  );
}

DivAnchor.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
