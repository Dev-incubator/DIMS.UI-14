import PropTypes from 'prop-types';
import classes from './Subtitle.module.css';

export default function Subtitle({ children }) {
  return <h2 className={classes.subtitle}>{children}</h2>;
}

Subtitle.propTypes = {
  children: PropTypes.node,
};
Subtitle.defaultProps = {
  children: '',
};
