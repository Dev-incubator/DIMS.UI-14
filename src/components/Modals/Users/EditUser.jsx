import PropTypes from 'prop-types';
import classes from './EditUser.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { ROLES, SEX, DIRECTIONS } from '../../../utilities/enums';
import { useInput, useValidator } from '../modals-helpers';
import { getLowerCasedStr, getTrimmedStr } from '../../../utilities/form-helpers';

export default function EditUser({ user, liftUpEditUser, closeFunc }) {
  const { state, onChange } = useInput({
    ...user,
    passwordRepeat: user.password,
  });

  const { errors, isValid } = useValidator(
    {
      username: true,
      surname: true,
      email: true,
      direction: true,
      role: true,
      password: true,
      passwordRepeat: true,
      dateOfBirth: true,
      phone: true,
      skype: true,
      startDate: true,
      education: true,
      averageScore: true,
      mathScore: true,
    },
    state.password,
    undefined,
    ['username', state.username],
    ['surname', state.surname],
    ['email', state.email],
    ['direction', state.direction],
    ['role', state.role],
    ['password', state.password],
    ['passwordRepeat', state.passwordRepeat],
    ['dateOfBirth', state.dateOfBirth],
    ['phone', state.phone],
    ['skype', state.skype],
    ['startDate', state.startDate],
    ['education', state.education],
    ['averageScore', state.averageScore],
    ['mathScore', state.mathScore],
  );

  const editUser = () => {
    const editedUser = { ...state, email: getLowerCasedStr(getTrimmedStr(state.email)) };
    delete editedUser.passwordRepeat;
    liftUpEditUser(editedUser);
    closeFunc();
  };

  return (
    <div className={classes.modal}>
      <h3 className={classes.title}>Edit Member</h3>
      <form>
        <div className={classes.wrapper}>
          <div className={classes.column}>
            <CraftInput
              title='Name'
              isRequired
              id='username'
              value={state.username}
              onChange={onChange}
              error={errors.usernameError}
            />
            <CraftInput
              title='Second name'
              isRequired
              id='surname'
              value={state.surname}
              onChange={onChange}
              error={errors.surnameError}
            />
            <CraftInput
              title='Email'
              isRequired
              id='email'
              value={state.email}
              onChange={onChange}
              error={errors.emailError}
            />
            <CraftInput
              id='direction'
              title='Direction'
              isRequired
              type='select'
              value={state.direction}
              onChange={onChange}
              error={errors.directionError}
              options={[
                DIRECTIONS.REACT,
                DIRECTIONS.ANGULAR,
                DIRECTIONS.JAVA,
                DIRECTIONS.NET,
                DIRECTIONS.SALESFORCE,
                DIRECTIONS.PHP,
              ]}
            />
            <CraftInput
              id='sex'
              type='select'
              title='Sex'
              value={state.sex}
              onChange={onChange}
              options={[SEX.MALE, SEX.FEMALE]}
            />
            <CraftInput
              id='role'
              title='Role'
              isRequired
              type='select'
              value={state.role}
              onChange={onChange}
              options={[ROLES.ADMIN, ROLES.MENTOR, ROLES.USER]}
              error={errors.roleError}
            />
            <CraftInput
              title='Password'
              type='password'
              isRequired
              id='password'
              value={state.password}
              onChange={onChange}
              error={errors.passwordError}
            />
            <CraftInput
              title='Repeat password'
              type='password'
              isRequired
              id='passwordRepeat'
              value={state.passwordRepeat}
              onChange={onChange}
              error={errors.passwordRepeatError}
            />
          </div>
          <div className={classes.column}>
            <CraftInput
              title='Date of Birth'
              type='date'
              isRequired
              id='dateOfBirth'
              value={state.dateOfBirth}
              onChange={onChange}
              error={errors.dateOfBirthError}
            />
            <CraftInput title='Address' id='address' value={state.address} onChange={onChange} />
            <CraftInput
              title='Mobile phone'
              type='tel'
              isRequired
              id='phone'
              value={state.phone}
              onChange={onChange}
              error={errors.phoneError}
            />
            <CraftInput
              title='Skype'
              isRequired
              id='skype'
              value={state.skype}
              onChange={onChange}
              error={errors.skypeError}
            />
            <CraftInput
              title='Start date'
              type='date'
              isRequired
              id='startDate'
              value={state.startDate}
              onChange={onChange}
              error={errors.startDateError}
            />
            <CraftInput
              title='Education'
              isRequired
              id='education'
              value={state.education}
              onChange={onChange}
              error={errors.educationError}
            />
            <CraftInput
              title='Univercity average score'
              isRequired
              id='averageScore'
              value={state.averageScore}
              onChange={onChange}
              error={errors.averageScoreError}
            />
            <CraftInput
              title='Math score'
              isRequired
              id='mathScore'
              value={state.mathScore}
              onChange={onChange}
              error={errors.mathScoreError}
            />
          </div>
        </div>
      </form>
      <div className={classes.requiredwarning}>* - these fields are required.</div>
      <div className={classes.buttons}>
        <Button onClick={editUser} roleClass='edit' disabled={!isValid}>
          Edit
        </Button>
        <Button onClick={() => closeFunc()}>Close</Button>
      </div>
    </div>
  );
}

EditUser.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  liftUpEditUser: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};
