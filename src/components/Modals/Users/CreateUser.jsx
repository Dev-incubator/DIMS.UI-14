import PropType from 'prop-types';
import React from 'react';
import classes from './CreateUser.module.css';
import Button from '../../Button/Button';
import {
  closeAnyUsersModal,
  USERS_MODAL,
  CREATE_USER_ONCHANGE,
  createUserHandleInputChange,
} from '../../../utilities/actionCreators';

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(action) {
    const { dispatch } = this.props;
    switch (action.type) {
      case USERS_MODAL:
        dispatch(closeAnyUsersModal());
        break;
      case CREATE_USER_ONCHANGE:
        this.setState((prevState) => ({
          ...prevState,
          [action.name]: action.body,
        }));
        break;
      default:
        break;
    }
  }

  render() {
    const closeUserCreateModal = () => {
      this.dispatch(closeAnyUsersModal());
    };
    const {
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
    } = this.state;
    const eventMaker = (event) => this.dispatch(createUserHandleInputChange(event));

    return (
      <div className={classes.modal}>
        <h3>Create Member</h3>
        <form>
          <div className={classes.wrapper}>
            <div className={classes.column}>
              <label htmlFor='username' className={classes.item}>
                <span>Name</span>
                <input
                  id='username'
                  name='username'
                  type='text'
                  placeholder='Enter first name'
                  value={username}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='surname' className={classes.item}>
                <span>Second name</span>
                <input
                  id='surname'
                  name='surname'
                  type='text'
                  placeholder='Enter second name'
                  value={surname}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='email' className={classes.item}>
                <span>Email</span>
                <input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='direction' className={classes.item}>
                <span>Direction</span>
                <select id='direction' name='direction' value={direction} onChange={eventMaker}>
                  <option value='React'>React</option>
                  <option value='Angular'>Angular</option>
                  <option value='Java'>Java</option>
                  <option value='.NET'>.NET</option>
                  <option value='Salesforce'>Salesforce</option>
                  <option value='PHP'>PHP</option>
                </select>
              </label>
              <label htmlFor='sex' className={classes.item}>
                <span>Sex</span>
                <select id='sex' name='sex' value={sex} onChange={eventMaker}>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                </select>
              </label>
              <label htmlFor='role' className={classes.item}>
                <span>Role</span>
                <select id='role' name='role' value={role} onChange={eventMaker}>
                  <option value='admin'>Admin</option>
                  <option value='mentor'>Mentor</option>
                  <option value='user'>User</option>
                </select>
              </label>
              <label htmlFor='password' className={classes.item}>
                <span>Password</span>
                <input
                  id='password'
                  name='password'
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='passwordRepeat' className={classes.item}>
                <span>Repeat password</span>
                <input
                  id='passwordRepeat'
                  name='passwordRepeat'
                  type='password'
                  placeholder='Repeat password'
                  value={passwordRepeat}
                  onChange={eventMaker}
                />
              </label>
            </div>
            <div className={classes.column}>
              <label htmlFor='dateOfBirth' className={classes.item}>
                <span>Date of Birth</span>
                <input id='dateOfBirth' name='dateOfBirth' type='date' value={dateOfBirth} onChange={eventMaker} />
              </label>
              <label htmlFor='address' className={classes.item}>
                <span>Address</span>
                <input
                  id='address'
                  name='address'
                  type='text'
                  placeholder='Enter address'
                  value={address}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='phone' className={classes.item}>
                <span>Mobile phone</span>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  placeholder='+375253334455'
                  value={phone}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='skype' className={classes.item}>
                <span>Skype</span>
                <input
                  id='skype'
                  name='skype'
                  type='text'
                  placeholder='Enter skype'
                  value={skype}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='startDate' className={classes.item}>
                <span>Start date</span>
                <input id='startDate' name='startDate' type='date' value={startDate} onChange={eventMaker} />
              </label>
              <label htmlFor='education' className={classes.item}>
                <span>Education</span>
                <input
                  id='education'
                  name='education'
                  type='text'
                  placeholder='Enter univercity'
                  value={education}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='averageScore' className={classes.item}>
                <span>Univercity average score</span>
                <input
                  id='averageScore'
                  name='averageScore'
                  type='text'
                  placeholder='Enter univercity average score'
                  value={averageScore}
                  onChange={eventMaker}
                />
              </label>
              <label htmlFor='mathScore' className={classes.item}>
                <span>Math score</span>
                <input
                  id='mathScore'
                  name='mathScore'
                  type='number'
                  placeholder='Enter math score'
                  value={mathScore}
                  onChange={eventMaker}
                />
              </label>
            </div>
          </div>
        </form>
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
