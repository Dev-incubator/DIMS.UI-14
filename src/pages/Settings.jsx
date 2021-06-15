import React from 'react';
import PropType from 'prop-types';
import Button from '../components/Button/Button';
import classes from './Settings.module.css';
import { resetUserPassword } from '../utilities/fb-helpers';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetBtnMsg: '',
    };
    this.handleReset = this.handleReset.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    this.setState({ resetBtnMsg: '' });
  }

  async handleReset() {
    const { loggedUser } = this.props;
    await resetUserPassword(loggedUser);
    this.setState({ resetBtnMsg: 'Email to reset password was succesfully sent' });
  }

  render() {
    const { resetBtnMsg } = this.state;
    const isResetted = resetBtnMsg !== '';

    return (
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Reset your password:</h2>
        <div className={classes.resetButton} onBlur={this.handleBlur}>
          <Button onClick={this.handleReset}>Click to reset</Button>
          {isResetted ? <div className={classes.resetText}>{resetBtnMsg}</div> : null}
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  loggedUser: PropType.instanceOf(Object).isRequired,
};
