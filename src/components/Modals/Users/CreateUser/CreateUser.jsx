import PropType from 'prop-types';
import React from 'react';
import classes from './CreateUser.module.css';
import Button from '../../../Button/Button';
import noop from '../../../../shared/noop';
import CraftInput from '../../CraftInput';
import { validateInput, checkAllFormValidity } from '../../../../utilities/form-validators';

import {
  closeAnyModal,
  CLOSE_MODAL,
  CREATE_USER_ONCHANGE,
  createUserHandleInputChange,
} from '../../../../utilities/action-сreators';

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
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(action) {
    const {
      validator,
      data: { password },
    } = this.state;
    const { dispatch } = this.props;
    switch (action.type) {
      case CLOSE_MODAL:
        dispatch(closeAnyModal());
        break;
      case CREATE_USER_ONCHANGE:
        this.setState((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            [action.name]: action.body,
          },
        }));
        if (action.name in validator) {
          const { name, validity, errorMsg } = validateInput(action.name, action.body, password);
          this.setState((prevState) => ({
            ...prevState,
            validator: {
              ...prevState.validator,
              [name]: validity,
            },
            errors: {
              ...prevState.errors,
              [`${name}Error`]: errorMsg,
            },
          }));
        }
        this.setState((prevState) => ({
          ...prevState,
          isValid: checkAllFormValidity(prevState.validator),
        }));
        break;
      default:
        break;
    }
  }

  render() {
    const closeModal = () => this.dispatch(closeAnyModal());

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

    const handleClick = (event) => {
      this.dispatch(createUserHandleInputChange(event));
    };

    return (
      <div className={classes.modal}>
        <h3>Create Member</h3>
        <form>
          <div className={classes.wrapper}>
            <div className={classes.column}>
              <CraftInput
                title='Name'
                isRequired
                id='username'
                value={username}
                onChange={handleClick}
                error={usernameError}
              />
              <CraftInput
                title='Second name'
                isRequired
                id='surname'
                value={surname}
                onChange={handleClick}
                error={surnameError}
              />
              <CraftInput title='Email' isRequired id='email' value={email} onChange={handleClick} error={emailError} />
              <CraftInput
                id='direction'
                title='Direction'
                isRequired
                type='select'
                value={direction}
                onChange={handleClick}
                error={directionError}
                options='React, Angular, Java, .NET, Salesforce, PHP'
              />
              <CraftInput
                id='sex'
                type='select'
                title='Sex'
                value={sex}
                onChange={handleClick}
                options='Male, Female'
              />
              <CraftInput
                id='role'
                title='Role'
                isRequired
                type='select'
                value={role}
                onChange={handleClick}
                options='Admin, Mentor, User'
                error={roleError}
              />
              <CraftInput
                title='Password'
                type='password'
                isRequired
                id='password'
                value={password}
                onChange={handleClick}
                error={passwordError}
              />
              <CraftInput
                title='Repeat password'
                type='password'
                isRequired
                id='passwordRepeat'
                value={passwordRepeat}
                onChange={handleClick}
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
                onChange={handleClick}
                error={dateOfBirthError}
              />
              <CraftInput title='Address' id='address' value={address} onChange={handleClick} />
              <CraftInput
                title='Mobile phone'
                type='tel'
                isRequired
                id='phone'
                value={phone}
                onChange={handleClick}
                error={phoneError}
              />
              <CraftInput title='Skype' isRequired id='skype' value={skype} onChange={handleClick} error={skypeError} />
              <CraftInput
                title='Start date'
                type='date'
                isRequired
                id='startDate'
                value={startDate}
                onChange={handleClick}
                error={startDateError}
              />
              <CraftInput
                title='Education'
                isRequired
                id='education'
                value={education}
                onChange={handleClick}
                error={educationError}
              />
              <CraftInput
                title='Univercity average score'
                isRequired
                id='averageScore'
                value={averageScore}
                onChange={handleClick}
                error={averageScoreError}
              />
              <CraftInput
                title='Math score'
                isRequired
                id='mathScore'
                value={mathScore}
                onChange={handleClick}
                error={mathScoreError}
              />
            </div>
          </div>
        </form>
        <div className={classes.requiredwarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={noop} roleclass='create' disabled={!isValid}>
            Create
          </Button>
          <Button onClick={closeModal}>Close</Button>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  dispatch: PropType.func.isRequired,
};
