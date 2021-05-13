import PropType from 'prop-types';
import React from 'react';
import classes from './CreateUser.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';

import {
  CREATE_USER_ONCHANGE,
  CREATE_USER_VALIDATE_FIELDS,
  CREATE_USER_VALIDATE_FORM,
  reducerFunc,
} from './User-helpers';

import { USERS, createElemRef } from '../../../utilities/fb-helpers';
import debounce from '../../../utilities/debounce';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        surname: '',
        email: '',
        direction: 'React',
        sex: '',
        role: 'User',
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
        id: createElemRef(USERS),
      },
      validator: {
        username: false,
        surname: false,
        email: false,
        direction: true,
        role: true,
        password: false,
        passwordRepeat: false,
        dateOfBirth: false,
        phone: false,
        skype: false,
        startDate: false,
        education: false,
        averageScore: false,
        mathScore: false,
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
    this.liftUpCreateUser = this.liftUpCreateUser.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState(
      (prevState) =>
        reducerFunc(prevState, {
          type: CREATE_USER_ONCHANGE,
          name,
          value,
        }),
      debounce(() => {
        this.validateFields(name, value);
      }, 1000),
    );
  }

  validateFields(fieldName, fieldValue) {
    const state = reducerFunc(this.state, { type: CREATE_USER_VALIDATE_FIELDS, fieldName, fieldValue });
    this.setState(state, this.validateForm);
  }

  validateForm() {
    const state = reducerFunc(this.state, { type: CREATE_USER_VALIDATE_FORM });
    this.setState(state);
  }

  closeModal() {
    const { closeFunc } = this.props;
    closeFunc();
  }

  liftUpCreateUser() {
    const { liftUpCreateUser } = this.props;
    const { data, data:{id} } = this.state;
    const newUser = { ...data };
    delete newUser.passwordRepeat;
    liftUpCreateUser(id, newUser);
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

    return (
      <div className={classes.modal}>
        <h3 className={classes.title}>Create Member</h3>
        <form>
          <div className={classes.wrapper}>
            <div className={classes.column}>
              <CraftInput
                title='Name'
                isRequired
                id='username'
                value={username}
                onChange={this.onChange}
                error={usernameError}
              />
              <CraftInput
                title='Second name'
                isRequired
                id='surname'
                value={surname}
                onChange={this.onChange}
                error={surnameError}
              />
              <CraftInput
                title='Email'
                isRequired
                id='email'
                value={email}
                onChange={this.onChange}
                error={emailError}
              />
              <CraftInput
                id='direction'
                title='Direction'
                isRequired
                type='select'
                value={direction}
                onChange={this.onChange}
                error={directionError}
                options='React, Angular, Java, .NET, Salesforce, PHP'
              />
              <CraftInput
                id='sex'
                type='select'
                title='Sex'
                value={sex}
                onChange={this.onChange}
                options='Male, Female'
              />
              <CraftInput
                id='role'
                title='Role'
                isRequired
                type='select'
                value={role}
                onChange={this.onChange}
                options='Admin, Mentor, User'
                error={roleError}
              />
              <CraftInput
                title='Password'
                type='password'
                isRequired
                id='password'
                value={password}
                onChange={this.onChange}
                error={passwordError}
              />
              <CraftInput
                title='Repeat password'
                type='password'
                isRequired
                id='passwordRepeat'
                value={passwordRepeat}
                onChange={this.onChange}
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
                onChange={this.onChange}
                error={dateOfBirthError}
              />
              <CraftInput title='Address' id='address' value={address} onChange={this.onChange} />
              <CraftInput
                title='Mobile phone'
                type='tel'
                isRequired
                id='phone'
                value={phone}
                onChange={this.onChange}
                error={phoneError}
              />
              <CraftInput
                title='Skype'
                isRequired
                id='skype'
                value={skype}
                onChange={this.onChange}
                error={skypeError}
              />
              <CraftInput
                title='Start date'
                type='date'
                isRequired
                id='startDate'
                value={startDate}
                onChange={this.onChange}
                error={startDateError}
              />
              <CraftInput
                title='Education'
                isRequired
                id='education'
                value={education}
                onChange={this.onChange}
                error={educationError}
              />
              <CraftInput
                title='Univercity average score'
                isRequired
                id='averageScore'
                value={averageScore}
                onChange={this.onChange}
                error={averageScoreError}
              />
              <CraftInput
                title='Math score'
                isRequired
                id='mathScore'
                value={mathScore}
                onChange={this.onChange}
                error={mathScoreError}
              />
            </div>
          </div>
        </form>
        <div className={classes.requiredwarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={this.liftUpCreateUser} roleClass='create' disabled={!isValid}>
            Create
          </Button>
          <Button onClick={this.closeModal}>Close</Button>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  closeFunc: PropType.func.isRequired,
  liftUpCreateUser: PropType.func.isRequired,
};
