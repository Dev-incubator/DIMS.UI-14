import React from 'react';
import PropType from 'prop-types';
import classes from './UserTask.module.css';
import Button from '../Button/Button';
import noop from '../../shared/noop';
import { internationalizeDate } from '../../utilities/internationalization';

export default class UserTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedID: '',
      isOpen: false,
      modalType: '',
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      selectedID: id,
    }));
  }

  liftUpChangeStatus(status) {
    const { selectedID } = this.state;
    const { actFunc } = this.props;
    actFunc(selectedID, status);
  }

  render() {
    const { tableIndex, isUser, status, startDate, deadLine, title } = this.props;

    const handleFail = () => this.liftUpChangeStatus('Failed');
    const handleComplete = () =>
      status === 'Active' ? this.liftUpChangeStatus('Completed') : this.liftUpChangeStatus('Active');

    const buttonGroup = isUser ? (
      <Button onClick={noop}>Create</Button>
    ) : (
      <>
        <Button roleClass={status === 'Active' ? 'create' : null} onClick={handleComplete}>
          {status === 'Active' ? 'Complete' : 'reActive'}
        </Button>
        <Button roleClass='delete' disabled={status === 'Failed'} onClick={handleFail}>
          Fail
        </Button>
      </>
    );

    return (
      <div className={classes.item}>
        <div>{tableIndex}</div>
        <div>{title}</div>
        <div>{internationalizeDate(startDate)}</div>
        <div>{internationalizeDate(deadLine)}</div>
        <div className={classes[status]}>{status}</div>
        <div className={classes.buttons}>{buttonGroup}</div>
      </div>
    );
  }
}

UserTask.propTypes = {
  tableIndex: PropType.number.isRequired,
  isUser: PropType.bool.isRequired,
  id: PropType.string.isRequired,
  startDate: PropType.string.isRequired,
  deadLine: PropType.string.isRequired,
  title: PropType.string.isRequired,
  status: PropType.string.isRequired,
  actFunc: PropType.func.isRequired,
};
