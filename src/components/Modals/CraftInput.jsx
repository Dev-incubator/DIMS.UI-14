import PropTypes from 'prop-types';
import classes from './CraftInput.module.css';
import Validator from './Users/Validator';
import noop from '../../shared/noop';

const CraftInput = ({ id, type, title, isRequired, onChange, readOnly, value, error, options }) => {
  let children;
  let input;

  if (type === 'select') {
    children = options.split(', ').map((item, index) => {
      return (
        <option key={index.toString()} value={item}>
          {item}
        </option>
      );
    });
    input = (
      <select
        className={error.length ? classes.error : null}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      >
        {children}
      </select>
    );
  } else {
    input = (
      <input
        className={error.length ? classes.error : null}
        type={type}
        id={id}
        name={id}
        placeholder={placeholderObj[id]}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    );
  }

  return (
    <label htmlFor={id} className={classes.formwrapper}>
      <div className={classes.item}>
        <span>{isRequired ? `${title}*` : `${title}`}</span>
        {input}
      </div>
      <Validator error={error} />
    </label>
  );
};

const placeholderObj = {
  username: 'Enter first name',
  surname: 'Enter second name',
  email: 'Enter email',
  password: 'Enter password',
  passwordRepeat: 'Repeat password',
  address: 'Enter address',
  phone: '+375291234567',
  skype: 'Enter skype',
  education: 'Enter univercity',
  averageScore: 'Enter univercity average score',
  mathScore: 'Enter math score',
};

CraftInput.propTypes = {
  options: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

CraftInput.defaultProps = {
  isRequired: false,
  readOnly: false,
  id: '',
  error: '',
  type: 'text',
  options: '',
  onChange: noop,
};

export default CraftInput;
