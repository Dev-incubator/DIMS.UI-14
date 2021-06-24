import HashLoader from 'react-spinners/HashLoader';
import PropTypes from 'prop-types';

const Loader = ({ color, size }) => {
  return (
    <HashLoader
      color={color}
      css='display: block; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);'
      size={size}
    />
  );
};

export default Loader;

Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Loader.defaultProps = {
  color: '#5385ff',
  size: 50,
};
