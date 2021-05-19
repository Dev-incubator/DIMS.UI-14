import PropTypes from 'prop-types';
import classes from './LoginInput.module.css';
import Validator from '../Modals/Users/Validator';
import passwordIcon from './icons/password.svg';
import userIcon from './icons/user.svg';

export default function LoginInput({ id, type, onChange, error, value }) {
  return (
    <div>
      <div className={classes.inputWrapper}>
        <label className={classes.item} htmlFor={id}>
          <img src={id === 'password' ? passwordIcon : userIcon} alt={`${id}-icon`} />
          <input
            value={value}
            name={id}
            onChange={onChange}
            className={classes.input}
            type={type}
            id={id}
            placeholder={placeholderObj[id]}
          />
        </label>
      </div>
      <Validator error={error} />
    </div>
  );
}

const placeholderObj = {
  email: 'Email',
  password: 'Password',
};

LoginInput.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
};

LoginInput.defaultProps = {
  type: 'text',
  error: '',
};
