import React from 'react';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import Button from '../components/Button/Button';
import debounce from '../utilities/debounce';
import {
  LOGIN_ONCHANGE,
  LOGIN_FAIL,
  LOGIN_PASS,
  LOGIN_VALIDATE_FIELDS,
  LOGIN_VALIDATE_FORM,
  reducerFunc,
} from './login-helpers';
import LoginInput from '../components/Login/LoginInput';
import LoginHeader from '../components/Login/LoginHeader';
import { signInUser } from '../utilities/fb-helpers';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    const {
      data: { email, password },
    } = this.state;
    const userStatus = await signInUser(email, password);
    if (!userStatus.email) {
      this.setState((prevState) =>
        reducerFunc(prevState, { type: LOGIN_FAIL, error: userStatus, initState: initialState }),
      );

      return;
    }

    this.setState((prevState) => reducerFunc(prevState, { type: LOGIN_PASS }));
  }

  handleChange(event) {
    const {
      target: { name, value },
    } = event;
    this.setState(
      (prevState) =>
        reducerFunc(prevState, {
          type: LOGIN_ONCHANGE,
          name,
          value,
        }),
      debounce(() => {
        this.validateFields(name, value);
      }, 1000),
    );
  }

  validateFields(fieldName, fieldValue) {
    const state = reducerFunc(this.state, { type: LOGIN_VALIDATE_FIELDS, fieldName, fieldValue });
    this.setState(state, this.validateForm);
  }

  validateForm() {
    const state = reducerFunc(this.state, { type: LOGIN_VALIDATE_FORM });
    this.setState(state);
  }

  render() {
    const {
      isValid,
      isLogged,
      loginError,
      data: { email, password },
      errors: { emailError, passwordError },
    } = this.state;
    const userLoginStatusMessage = loginError ? <div className={classes.loginError}>{loginError}</div> : null;
    const isLoggedRedirector = isLogged ? (
      <Redirect
        to={{
          pathname: '/main',
          state: {
            loggedUserEmail: email,
          },
        }}
      />
    ) : null;

    return (
      <>
        <LoginHeader />
        <h2 className={classes.welcome}>
          Welcome <span>back!</span>
        </h2>
        <form className={classes.form}>
          <div className={classes.formWrapper}>
            <LoginInput id='email' type='email' value={email} onChange={this.handleChange} error={emailError} />
            <LoginInput
              id='password'
              type='password'
              value={password}
              onChange={this.handleChange}
              error={passwordError}
            />
          </div>
          {userLoginStatusMessage}
          {isLoggedRedirector}
          <Button disabled={!isValid} onClick={this.handleClick}>
            Enter
          </Button>
        </form>
      </>
    );
  }
}

const initialState = {
  data: {
    email: '',
    password: '',
  },
  validator: {
    email: false,
    password: false,
  },
  errors: {
    emailError: '',
    passwordError: '',
  },
  loginError: '',
  isLogged: false,
  isValid: false,
};
