import PropType from 'prop-types';
import React from 'react';
import classes from './CreateUser.module.css';
import Button from '../../Button/Button';
import Validator from './Validator';
import {
  closeAnyUsersModal,
  USERS_MODAL,
  CREATE_USER_ONCHANGE,
  createUserHandleInputChange,
  CREATE_USER_VALIDATE,
  createUserFormValidate,
} from '../../../utilities/actionCreators';

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
        role: 'user',
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
        dateOfBirth: false,
        phone: false,
        skype: false,
        startDate: false,
        education: false,
        averageScore: false,
        mathScore: false,
      },
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
    let validatorField = false;
    let errorField = '';
    const {
      data: { password },
    } = this.state;
    const { dispatch } = this.props;
    switch (action.type) {
      case USERS_MODAL:
        dispatch(closeAnyUsersModal());
        break;
      case CREATE_USER_ONCHANGE:
        this.setState((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            [action.name]: action.body,
          },
        }));
        break;
      case CREATE_USER_VALIDATE:
        switch (action.name) {
          case 'username':
            validatorField = Boolean(action.body.match(/[a-z]{2,}/gi));
            errorField = validatorField ? '' : 'This field must contain at least 2 letters';
            break;
          case 'surname':
            validatorField = Boolean(action.body.match(/[a-z]{2,}/gi));
            errorField = validatorField ? '' : 'This field must contain at least 2 letters';
            break;
          case 'email':
            validatorField = Boolean(action.body.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g));
            errorField = validatorField ? '' : 'The entered email is incorrect';
            break;
          case 'direction':
            validatorField = Boolean(action.body);
            errorField = validatorField ? '' : 'This field is required';
            break;
          case 'role':
            validatorField = Boolean(action.body);
            errorField = validatorField ? '' : 'This field is required';
            break;
          case 'password':
            validatorField = Boolean(
              action.body.match(/(?=.*[0-9])(?=.*[-_!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*_-]{8,}/g),
            );
            errorField = validatorField
              ? ''
              : 'Password must contain at least 8 characters, incl. at least 1 uppercase and lowercase letters, 1 number and 1 special character';
            break;
          case 'passwordRepeat':
            validatorField = action.body === password;
            errorField = validatorField ? '' : "Passwords don't match";
            break;
          case 'dateOfBirth':
            validatorField = new Date().getFullYear() - new Date(action.body).getFullYear() >= 18;
            errorField = validatorField ? '' : 'User must be over 18 years old';
            break;
          case 'phone':
            validatorField = Boolean(action.body.match(/^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/));
            errorField = validatorField ? '' : 'The entered phone is incorrect';
            break;
          case 'skype':
            validatorField = Boolean(action.body);
            errorField = validatorField ? '' : 'This field is required';
            break;
          case 'startDate':
            validatorField = Boolean(action.body);
            errorField = validatorField ? '' : 'This field is required';
            break;
          case 'education':
            validatorField = Boolean(action.body);
            errorField = validatorField ? '' : 'This field is required';
            break;
          case 'averageScore':
            validatorField = Boolean(action.body.match(/^\d{1}(\.\d{1})?$/));
            errorField = validatorField ? '' : 'The entered number is incorrect';
            break;
          case 'mathScore':
            validatorField = Boolean(action.body.match(/^\d{1}(\.\d{1})?$/));
            errorField = validatorField ? '' : 'The entered number is incorrect';
            break;
          default:
            break;
        }
        this.setState((prevState) => ({
          ...prevState,
          validator: {
            ...prevState.validator,
            [action.name]: validatorField,
          },
          errors: {
            ...prevState.errors,
            [`${action.name}Error`]: errorField,
          },
        }));
        break;
      default:
        break;
    }
  }

  render() {
    const closeUserCreateModal = () => this.dispatch(closeAnyUsersModal());

    const {
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
    const eventMakerAndValidator = (event) => {
      this.dispatch(createUserHandleInputChange(event));
      this.dispatch(createUserFormValidate(event));
    };
    const eventMaker = (event) => {
      this.dispatch(createUserHandleInputChange(event));
    };

    return (
      <div className={classes.modal}>
        <h3>Create Member</h3>
        <form>
          <div className={classes.wrapper}>
            <div className={classes.column}>
              <label htmlFor='username' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Name*</span>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    placeholder='Enter first name'
                    value={username}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={usernameError} />
              </label>
              <label htmlFor='surname' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Second name*</span>
                  <input
                    id='surname'
                    name='surname'
                    type='text'
                    placeholder='Enter second name'
                    value={surname}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={surnameError} />
              </label>
              <label htmlFor='email' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Email*</span>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={emailError} />
              </label>
              <label htmlFor='direction' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Direction*</span>
                  <select id='direction' name='direction' value={direction} onChange={eventMakerAndValidator}>
                    <option value='React'>React</option>
                    <option value='Angular'>Angular</option>
                    <option value='Java'>Java</option>
                    <option value='.NET'>.NET</option>
                    <option value='Salesforce'>Salesforce</option>
                    <option value='PHP'>PHP</option>
                  </select>
                </div>
                <Validator error={directionError} />
              </label>
              <label htmlFor='sex' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Sex</span>
                  <select id='sex' name='sex' value={sex} onChange={eventMaker}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>
              </label>
              <label htmlFor='role' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Role*</span>
                  <select id='role' name='role' value={role} onChange={eventMakerAndValidator}>
                    <option value='admin'>Admin</option>
                    <option value='mentor'>Mentor</option>
                    <option value='user'>User</option>
                  </select>
                </div>
                <Validator error={roleError} />
              </label>
              <label htmlFor='password' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Password*</span>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={passwordError} />
              </label>
              <label htmlFor='passwordRepeat' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Repeat password*</span>
                  <input
                    id='passwordRepeat'
                    name='passwordRepeat'
                    type='password'
                    placeholder='Repeat password'
                    value={passwordRepeat}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={passwordRepeatError} />
              </label>
            </div>
            <div className={classes.column}>
              <label htmlFor='dateOfBirth' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Date of Birth*</span>
                  <input
                    id='dateOfBirth'
                    name='dateOfBirth'
                    type='date'
                    value={dateOfBirth}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={dateOfBirthError} />
              </label>
              <label htmlFor='address' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Address</span>
                  <input
                    id='address'
                    name='address'
                    type='text'
                    placeholder='Enter address'
                    value={address}
                    onChange={eventMaker}
                  />
                </div>
              </label>
              <label htmlFor='phone' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Mobile phone*</span>
                  <input
                    id='phone'
                    name='phone'
                    type='tel'
                    placeholder='+375253334455'
                    value={phone}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={phoneError} />
              </label>
              <label htmlFor='skype' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Skype*</span>
                  <input
                    id='skype'
                    name='skype'
                    type='text'
                    placeholder='Enter skype'
                    value={skype}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={skypeError} />
              </label>
              <label htmlFor='startDate' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Start date*</span>
                  <input
                    id='startDate'
                    name='startDate'
                    type='date'
                    value={startDate}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={startDateError} />
              </label>
              <label htmlFor='education' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Education*</span>
                  <input
                    id='education'
                    name='education'
                    type='text'
                    placeholder='Enter univercity'
                    value={education}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={educationError} />
              </label>
              <label htmlFor='averageScore' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Univercity average score*</span>
                  <input
                    id='averageScore'
                    name='averageScore'
                    type='text'
                    placeholder='Enter univercity average score'
                    value={averageScore}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={averageScoreError} />
              </label>
              <label htmlFor='mathScore' className={classes.formwrapper}>
                <div className={classes.item}>
                  <span>Math score*</span>
                  <input
                    id='mathScore'
                    name='mathScore'
                    type='text'
                    placeholder='Enter math score'
                    value={mathScore}
                    onChange={eventMakerAndValidator}
                  />
                </div>
                <Validator error={mathScoreError} />
              </label>
            </div>
          </div>
        </form>
        <div className={classes.requiredwarning}>* - these fields are required.</div>
        <div className={classes.buttons}>
          <Button onClick={() => {}} roleclass='create'>
            Create
          </Button>
          <Button onClick={closeUserCreateModal}>Close</Button>
        </div>
      </div>
    );
  }
}

CreateUser.propTypes = {
  dispatch: PropType.func.isRequired,
};
