import PropType from 'prop-types';
import React from 'react';
import classes from './EditTrack.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

import {
  EDIT_TRACK_ONCHANGE,
  EDIT_TRACK_VALIDATE_FIELDS,
  EDIT_TRACK_VALIDATE_FORM,
  reducerFunc,
} from './track-helpers';
import debounce from '../../../utilities/debounce';

export default class EditTrack extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      data: {
        id: '',
        date: '',
        note: '',
        name: '',
      },
      validator: {
        date: true,
        name: true,
      },
      errors: {
        dateError: '',
        nameError: '',
      },
      isValid: false,
    };
    this.liftUpEditTrack = this.liftUpEditTrack.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const {
      track: { id, date, note, title, name, startDate },
    } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      title,
      startDate,
      data: {
        ...prevState.data,
        id,
        date,
        note,
        name,
      },
    }));
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(
      (prevState) =>
        reducerFunc(prevState, {
          type: EDIT_TRACK_ONCHANGE,
          name,
          value,
        }),
      debounce(() => {
        this.validateFields(name, value);
      }, 1000),
    );
  }

  validateFields(fieldName, fieldValue) {
    const state = reducerFunc(this.state, { type: EDIT_TRACK_VALIDATE_FIELDS, fieldName, fieldValue });
    this.setState(state, this.validateForm);
  }

  validateForm() {
    const state = reducerFunc(this.state, { type: EDIT_TRACK_VALIDATE_FORM });
    this.setState(state);
  }

  liftUpEditTrack() {
    const { liftUpEditTrack } = this.props;
    const { data } = this.state;
    const editedTrack = { ...data };
    liftUpEditTrack(editedTrack);
    this.closeModal();
  }

  closeModal() {
    const { closeFunc } = this.props;
    closeFunc();
  }

  render() {
    const {
      isValid,
      title,
      data: { date, note, name },
      errors: { dateError, nameError },
    } = this.state;

    return (
      <div className={classes.modal}>
        <h3 className={classes.title}>Edit Track</h3>
        <form>
          <div className={classes.wrapper}>
            <CraftInput title='Task Name' readOnly value={title} />
            <CraftInput
              title='Track Name'
              isRequired
              id='name'
              value={name}
              onChange={this.onChange}
              error={nameError}
            />
            <CraftInput
              title='Date'
              isRequired
              id='date'
              type='date'
              value={date}
              error={dateError}
              onChange={this.onChange}
            />
            <CraftInput title='Note' id='note' type='textarea' value={note} onChange={this.onChange} />
          </div>
          <div className={classes.requiredwarning}>* - these fields are required.</div>
          <div className={classes.buttons}>
            <Button onClick={this.liftUpEditTrack} roleClass='edit' disabled={!isValid}>
              Edit
            </Button>
            <Button onClick={this.closeModal}>Close</Button>
          </div>
        </form>
      </div>
    );
  }
}

EditTrack.propTypes = {
  track: PropType.instanceOf(Object).isRequired,
  closeFunc: PropType.func.isRequired,
  liftUpEditTrack: PropType.func.isRequired,
};
