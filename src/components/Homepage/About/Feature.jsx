import PropTypes from 'prop-types';
import classes from './Feature.module.css';

export default function Feature({ img, title, descr, reversed }) {
  return reversed ? (
    <div className={`${classes.features__item} ${classes.features__item_reversed}`}>
      <div className={classes.features__text}>
        <div className={classes.features__title}>{title}</div>
        <div className={classes.features__descr}>{descr}</div>
      </div>
      <div className={classes.features__image}>
        <img src={img} alt='feature-img' />
      </div>
    </div>
  ) : (
    <div className={classes.features__item}>
      <div className={classes.features__image}>
        <img src={img} alt='feature-img' />
      </div>
      <div className={classes.features__text}>
        <div className={classes.features__title}>{title}</div>
        <div className={classes.features__descr}>{descr}</div>
      </div>
    </div>
  );
}

Feature.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  descr: PropTypes.string,
  reversed: PropTypes.bool,
};

Feature.defaultProps = {
  img: '',
  title: '',
  descr: '',
  reversed: false,
};
