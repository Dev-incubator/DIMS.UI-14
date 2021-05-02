import PropType from 'prop-types';
import classes from './ShowUser.module.css';
import Button from '../../Button/Button';
import CraftInput from '../CraftInput';
import { intDate } from '../../../utilities/internationalization';

export default function ShowUser({ user, closeFunc }) {
  const {
    username,
    surname,
    email,
    direction,
    sex,
    role,
    password,
    dateOfBirth,
    address,
    phone,
    skype,
    startDate,
    education,
    averageScore,
    mathScore,
  } = user;

  return (
    <div className={classes.modal}>
      <h3>Member Details</h3>
      <form>
        <div className={classes.wrapper}>
          <div className={classes.column}>
            <CraftInput title='Name' readOnly value={username} />
            <CraftInput title='Second name' readOnly value={surname} />
            <CraftInput title='Email' readOnly value={email} />
            <CraftInput title='Direction' readOnly value={direction} />
            <CraftInput title='Sex' readOnly value={sex} />
            <CraftInput title='Role' readOnly value={role} />
            <CraftInput title='Password' readOnly value={password} />
          </div>
          <div className={classes.column}>
            <CraftInput title='Date of Birth' readOnly value={intDate(dateOfBirth)} />
            <CraftInput title='Address' readOnly value={address} />
            <CraftInput title='Mobile phone' readOnly value={phone} />
            <CraftInput title='Skype' readOnly value={skype} />
            <CraftInput title='Start date' readOnly value={intDate(startDate)} />
            <CraftInput title='Education' readOnly value={education} />
            <CraftInput title='Univercity average score' readOnly value={averageScore} />
            <CraftInput title='Math score' readOnly value={mathScore} />
          </div>
        </div>
      </form>
      <div className={classes.buttons}>
        <Button onClick={closeFunc}>Close</Button>
      </div>
    </div>
  );
}

ShowUser.propTypes = {
  user: PropType.instanceOf(Object).isRequired,
  closeFunc: PropType.func.isRequired,
};
