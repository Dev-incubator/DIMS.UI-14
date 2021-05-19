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
  } else if (type === 'checkbox') {
    children = options.map((item) => {
      const isChecked = value.find((userId) => userId === item.id);

      return (
        <div key={item.id} className={classes.checkboxElem}>
          <input
            type={type}
            id={item.id}
            name={item.id}
            value={item.id}
            disabled={readOnly}
            checked={isChecked}
            onChange={onChange}
          />
          <label htmlFor={item.id}>
            {item.username} {item.surname}
          </label>
        </div>
      );
    });
    input = <div className={`${classes.checkbox} ${readOnly ? classes.readOnly : null}`}>{children}</div>;
  } else if (type === 'textarea') {
    input = (
      <textarea
        className={classes.textArea}
        id={id}
        name={id}
        placeholder={placeholderObj[id]}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        rows={5}
      />
    );
  } else {
    input = (
      <input
        className={`${classes.craftInput} ${error.length ? classes.error : null}`}
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
  title: 'Enter task title',
  description: 'Enter task descriptions',
  note: 'Enter track note',
};

CraftInput.propTypes = {
  options: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]),
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Array)]).isRequired,
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
