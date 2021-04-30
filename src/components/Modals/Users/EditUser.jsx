import PropType from 'prop-types';
import React from 'react';
import classes from './EditUser.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

import { EDIT_USER_ONCHANGE, EDIT_USER_VALIDATE_FIELDS, EDIT_USER_VALIDATE_FORM, reducerFunc } from './User-helpers';

import debounce from '../../../utilities/debounce';

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        surname: '',
        email: '',
        direction: '',
        sex: '',
        role: '',
        password: '',
        passwordRepeat: '',
        dateOfBirth: '',
        address: '',
        phone: '',
        skype: '',
        startDate: '',
        education: '',
        averageScore: '',
        mathScore: '',
      },
      validator: {
        username: true,
        surname: true,
        email: true,
        direction: true,
        role: true,
        password: false,
        passwordRepeat: false,
        dateOfBirth: true,
        phone: true,
        skype: true,
        startDate: true,
        education: true,
        averageScore: true,
        mathScore: true,
      },
      isValid: false,
      errors: {
        usernameError: '',
        surnameError: '',
        emailError: '',
        directionError: '',
        roleError: '',
        passwordError: '',
        passwordRepeatError: '',
        dateOfBirthError: '',
        phoneError: '',
        skypeError: '',
        startDateError: '',
        educationError: '',
        averageScoreError: '',
        mathScoreError: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.liftUpEditUser = this.liftUpEditUser.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      data: {
        ...user,
        password: '',
        passwordRepeat: '',
      },
    }));
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(
      (prevState) =>
        reducerFunc(prevState, {
          type: EDIT_USER_ONCHANGE,
          name,
          value,
        }),
      debounce(() => {
        this.validateFields(name, value);
      }, 1000),
    );
  }

  validateFields(fieldName, fieldValue) {
    const state = reducerFunc(this.state, { type: EDIT_USER_VALIDATE_FIELDS, fieldName, fieldValue });
    this.setState(state, this.validateForm);
  }

  validateForm() {
    const state = reducerFunc(this.state, { type: EDIT_USER_VALIDATE_FORM });
    this.setState(state);
  }

  closeModal() {
    const { closeFunc } = this.props;
    closeFunc();
  }

  liftUpEditUser() {
    const { actFunc } = this.props;
    const { data } = this.state;
    const editedUser = { ...data };
    delete editedUser.passwordRepeat;
    actFunc(editedUser);
    this.closeModal();
  }

  render() {
    const {
      isValid,
      data: {
        username,
        surname,
        email,
        direction,
        sex,
        role,
        password,
        passwordRepeat,
        dateOfBirth,
        address,
        phone,
        skype,
        startDate,
        education,
        averageScore,
        mathScore,
      },
      errors: {
        usernameError,
        surnameError,
        emailError,
        directionError,
        roleError,
        passwordError,
        passwordRepeatError,
        dateOfBirthError,
        phoneError,
        skypeError,
        startDateError,
        educationError,
        averageScoreError,
        mathScoreError,
      },
    } = this.state;

    const handleChange = (event) => {
      this.onChange(event);
    };

    const editUser = () => this.liftUpEditUser();

    return (
      <div className={classes.modal}>
        <h3>Edit Member</h3>
        <form>
          <div className={classes.wrapper}>
            <div className={classes.column}>
              <CraftInput
                title='Name'
                isRequired
                id='username'
                value={username}
                onChange={handleChange}
                error={usernameError}
              />
              <CraftInput
                title='Second name'
                isRequired
                id='surname'
                value={surname}
                onChange={handleChange}
                error={surnameError}
              />
              <CraftInput
                title='Email'
                isRequired
                id='email'
                value={email}
                onChange={handleChange}
                error={emailError}
              />
              <CraftInput
                id='direction'
                title='Direction'
                isRequired
                type='select'
                value={direction}
                onChange={handleChange}
                error={directionError}
                options='React, Angular, Java, .NET, Salesforce, PHP'
              />
              <CraftInput
                id='sex'
                type='select'
                title='Sex'
                value={sex}
                onChange={handleChange}
                options='Male, Female'
              />
              <CraftInput
                id='role'
                title='Role'
                isRequired
                type='select'
                value={role}
                onChange={handleChange}
                options='Admin, Mentor, User'
                error={roleError}
              />
              <CraftInput
                title='Password'
                type='password'
                isRequired
                id='password'
                value={password}
                onChange={handleChange}
                error={passwordError}
              />
              <CraftInput
                title='Repeat password'
                type='password'
                isRequired
                id='passwordRepeat'
                value={passwordRepeat}
                onChange={handleChange}
                error={passwordRepeatError}
              />
            </div>
            <div className={classes.column}>
              <CraftInput
                title='Date of Birth'
                type='date'
                isRequired
                id='dateOfBirth'
                value={dateOfBirth}
                onChange={handleChange}
                error={dateOfBirthError}
              />
              <CraftInput title='Address' id='address' value={address} onChange={handleChange} />
              <CraftInput
                title='Mobile phone'
                type='tel'
                isRequired
                id='phone'
                value={phone}
                onChange={handleChange}
                error={phoneError}
              />
              <CraftInput
                title='Skype'
                isRequired
                id='skype'
                value={skype}
                onChange={handleChange}
                error={skypeError}
              />
              <CraftInput
                title='Start date'
                type='date'
                isRequired
                id='startDate'
                value={startDate}
                onChange={handleChange}
                error={startDateError}
              />
              <CraftInput
                title='Education'
                isRequired
                id='education'
                value={education}
                onChange={handleChange}
                error={educationError}
              />
              <CraftInput
                title='Univercity average score'
                isRequired
                id='averageScore'
                value={averageScore}
                onChange={handleChange}
                error={averageScoreError}
              />
              <CraftInput
                title='Math score'
                isRequired
                id='mathScore'
                value={mathScore}
                onChange={handleChange}
                error={mathScoreError}
              />
            </div>
          </div>
        </form>
        <div className={classes.requiredwarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={editUser} roleclass='edit' disabled={!isValid}>
            Edit
          </Button>
          <Button onClick={this.closeModal}>Close</Button>
        </div>
      </div>
    );
  }
}

EditUser.propTypes = {
  closeFunc: PropType.func.isRequired,
  actFunc: PropType.func.isRequired,
  user: PropType.instanceOf(Object).isRequired,
};
