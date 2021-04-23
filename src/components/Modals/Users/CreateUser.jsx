import PropType from 'prop-types';
import classes from './CreateUser.module.css';
import Button from '../../Button/Button';
import { closeAnyUsersModal } from '../../../utilities/actionCreators';

export default function CreateUser({ dispatch }) {
  const closeUserCreateModal = () => {
    dispatch(closeAnyUsersModal());
  };

  return (
    <div className={classes.modal}>
      <h3>Create Member</h3>
      <form>
        <div className={classes.wrapper}>
          <div className={classes.column}>
            <label htmlFor='name' className={classes.item}>
              <span>Name</span>
              <input id='name' name='name' type='text' placeholder='Enter first name' />
            </label>
            <label htmlFor='secondName' className={classes.item}>
              <span>Second name</span>
              <input id='secondName' name='secondName' type='text' placeholder='Enter second name' />
            </label>
            <label htmlFor='email' className={classes.item}>
              <span>Email</span>
              <input id='email' name='email' type='email' placeholder='Enter email' />
            </label>
            <label htmlFor='direction' className={classes.item}>
              <span>Direction</span>
              <input id='direction' name='direction' type='radio' placeholder='Select direction' />
            </label>
            <label htmlFor='Sex' className={classes.item}>
              <span>Sex</span>
              <input id='sex' name='sex' type='radio' placeholder='Select sex' />
            </label>
            <label htmlFor='role' className={classes.item}>
              <span>Role</span>
              <input id='role' name='role' type='radio' />
            </label>
            <label htmlFor='password' className={classes.item}>
              <span>Password</span>
              <input id='password' name='password' type='password' placeholder='Enter password' />
            </label>
            <label htmlFor='passwordRepeat' className={classes.item}>
              <span>Repeat password</span>
              <input id='passwordRepeat' name='passwordRepeat' type='password' placeholder='Repeat password' />
            </label>
          </div>
          <div className={classes.column}>
            <label htmlFor='dateOfBirth' className={classes.item}>
              <span>Date of Birth</span>
              <input id='dateOfBirth' name='dateOfBirth' type='date' />
            </label>
            <label htmlFor='address' className={classes.item}>
              <span>Address</span>
              <input id='address' name='address' type='text' placeholder='Enter address' />
            </label>
            <label htmlFor='phone' className={classes.item}>
              <span>Mobile phone</span>
              <input id='phone' name='phone' type='tel' placeholder='+375253334455' />
            </label>
            <label htmlFor='skype' className={classes.item}>
              <span>Skype</span>
              <input id='skype' name='skype' type='text' placeholder='Enter skype' />
            </label>
            <label htmlFor='startDate' className={classes.item}>
              <span>Start date</span>
              <input id='startDate' name='startDate' type='date' />
            </label>
            <label htmlFor='education' className={classes.item}>
              <span>Education</span>
              <input id='education' name='education' type='text' placeholder='Enter univercity' />
            </label>
            <label htmlFor='averageScore' className={classes.item}>
              <span>Univercity average score</span>
              <input id='averageScore' name='averageScore' type='text' placeholder='Enter univercity average score' />
            </label>
            <label htmlFor='mathScore' className={classes.item}>
              <span>Math score</span>
              <input id='mathScore' name='mathScore' type='number' placeholder='Enter math score' />
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

CreateUser.propTypes = {
  dispatch: PropType.func.isRequired,
};
