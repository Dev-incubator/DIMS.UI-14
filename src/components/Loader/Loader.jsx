import HashLoader from 'react-spinners/HashLoader';

const Loader = () => {
  return (
    <HashLoader
      color='#5385ff'
      css='display: block; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);'
      size={50}
    />
  );
};

export default Loader;
