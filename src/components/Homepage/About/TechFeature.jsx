import PropTypes from 'prop-types';
import classes from './TechFeature.module.css';

export default function TechFeature({ img, title, descr }) {
  return (
    <div className={classes.tech__item}>
      <div className={classes.tech__icon}>
        <img src={img} alt='feature-technologies-img' />
      </div>
      <h3 className={classes.tech__title}>{title}</h3>
      <p className={classes.tech_text}>{descr}</p>
    </div>
  );
}

TechFeature.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  descr: PropTypes.string,
};

TechFeature.defaultProps = {
  img: '',
  title: '',
  descr: '',
};
