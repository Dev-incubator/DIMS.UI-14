import React from 'react';
import PropType from 'prop-types';
import classes from './Login.module.css';
import Button from '../components/Button/Button';
import GoogleButton from '../components/Button/GoogleButton';
import debounce from '../utilities/debounce';
import { LOGIN_ONCHANGE, LOGIN_FAIL, LOGIN_VALIDATE_FIELDS, LOGIN_VALIDATE_FORM, reducerFunc } from './login-helpers';
import LoginInput from '../components/Login/LoginInput';
import LoginHeader from '../components/Login/LoginHeader';
import { signInUser, signInWithGoogle } from '../utilities/fb-helpers';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGoogleButtonClick = this.handleGoogleButtonClick.bind(this);
  }

  async handleGoogleButtonClick() {
    const userData = await signInWithGoogle();
    if (!userData.email) {
      this.setState((prevState) =>
        reducerFunc(prevState, { type: LOGIN_FAIL, error: { code: 'auth/user-not-found' }, initState: initialState }),
      );

      return;
    }
    const { setUserContext } = this.props;
    setUserContext(userData);
  }

  async handleClick() {
    const {
      data: { email, password },
    } = this.state;
    const userData = await signInUser(email, password);
    if (!userData.email) {
      this.setState((prevState) =>
        reducerFunc(prevState, { type: LOGIN_FAIL, error: userData, initState: initialState }),
      );

      return;
    }
    const { setUserContext } = this.props;
    setUserContext(userData);
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
      loginError,
      data: { email, password },
      errors: { emailError, passwordError },
    } = this.state;
    const userLoginStatusMessage = loginError ? <div className={classes.loginError}>{loginError}</div> : null;

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
          <div className={classes.buttonWrapper}>
            <Button disabled={!isValid} onClick={this.handleClick} onScreen>
              Enter
            </Button>
            <GoogleButton onClick={this.handleGoogleButtonClick}>Login with Google</GoogleButton>
          </div>
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

Login.propTypes = {
  setUserContext: PropType.func.isRequired,
};
