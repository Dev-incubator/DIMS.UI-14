import PropTypes from 'prop-types';
import classes from './RoleFeature.module.css';

export default function RoleFeature({ img, title, list }) {
  return (
    <div className={classes.roles__item}>
      <div className={classes.roles__header}>
        <div className={classes.roles__circle}>{img}</div>
        <h3 className={classes.roles__title}>{title}</h3>
      </div>
      <div className={classes.roles__listWrapper}>
        <ul className={classes.roles__list}>
          {list.map((item, index) => (
            <li key={index.toString()}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

RoleFeature.propTypes = {
  img: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string,
  list: PropTypes.instanceOf(Array),
};

RoleFeature.defaultProps = {
  title: '',
  list: [],
};
