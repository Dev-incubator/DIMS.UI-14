import PropType from 'prop-types';
import React from 'react';
import classes from './CreateTrack.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

export default class CreateTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        date: '',
        note: '',
      },
      // validator: {
      //   date: false,
      // },
      // errors: {
      //   dateError: '',
      // },
      isValid: false,
    };
    this.liftUpCreateTrack = this.liftUpCreateTrack.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  liftUpCreateTrack() {
    const { liftUpCreateTrack } = this.props;
    liftUpCreateTrack();
  }

  closeModal() {
    const { closeFunc } = this.props;
    closeFunc();
  }

  render() {
    const {
      isValid,
      data: { date },
    } = this.state;

    return (
      <div className={classes.modal}>
        <h3 className={classes.title}>Create New Track</h3>
        <form>
          <div className={classes.wrapper}>
            <CraftInput title='Date' isRequired id='date' type='date' value={date} />
          </div>
          <div className={classes.requiredwarning}>* - these fields are required.</div>
          <div className={classes.buttons}>
            <Button onClick={this.liftUpCreateTrack} roleClass='create' disabled={!isValid}>
              Create
            </Button>
            <Button onClick={this.closeModal}>Close</Button>
          </div>
        </form>
      </div>
    );
  }
}

CreateTrack.propTypes = {
  closeFunc: PropType.func.isRequired,
  liftUpCreateTrack: PropType.func.isRequired,
};
