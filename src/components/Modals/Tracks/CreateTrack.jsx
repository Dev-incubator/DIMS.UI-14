import PropType from 'prop-types';
import React from 'react';
import classes from './CreateTrack.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

import { TRACKS, createElemRefOnDB } from '../../../utilities/fb-helpers';
import {
  CREATE_TRACK_ONCHANGE,
  CREATE_TRACK_VALIDATE_FIELDS,
  CREATE_TRACK_VALIDATE_FORM,
  reducerFunc,
} from './track-helpers';
import debounce from '../../../utilities/debounce';

export default class CreateTrack extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startDate: '',
      data: {
        id: createElemRefOnDB(TRACKS).id,
        name: '',
        date: '',
        note: '',
      },
      validator: {
        name: false,
        date: false,
      },
      errors: {
        nameError: '',
        dateError: '',
      },
      isValid: false,
    };
    this.liftUpCreateTrack = this.liftUpCreateTrack.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const {
      task: { startDate, title },
    } = this.props;
    this.setState({ title, startDate });
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(
      (prevState) =>
        reducerFunc(prevState, {
          type: CREATE_TRACK_ONCHANGE,
          name,
          value,
        }),
      debounce(() => {
        this.validateFields(name, value);
      }, 1000),
    );
  }

  validateFields(fieldName, fieldValue) {
    const state = reducerFunc(this.state, { type: CREATE_TRACK_VALIDATE_FIELDS, fieldName, fieldValue });
    this.setState(state, this.validateForm);
  }

  validateForm() {
    const state = reducerFunc(this.state, { type: CREATE_TRACK_VALIDATE_FORM });
    this.setState(state);
  }

  liftUpCreateTrack() {
    const { liftUpCreateTrack } = this.props;
    const { data } = this.state;
    const newTrack = { ...data };
    liftUpCreateTrack(newTrack);
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
        <h3 className={classes.title}>Create New Track</h3>
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
              title='Track Date'
              isRequired
              id='date'
              type='date'
              value={date}
              error={dateError}
              onChange={this.onChange}
            />
            <CraftInput title='Track Note' id='note' type='textarea' value={note} onChange={this.onChange} />
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
  task: PropType.shape({
    startDate: PropType.string,
    title: PropType.string,
  }).isRequired,
  closeFunc: PropType.func.isRequired,
  liftUpCreateTrack: PropType.func.isRequired,
};
