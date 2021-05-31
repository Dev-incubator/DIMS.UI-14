import React from 'react';
import PropType from 'prop-types';
import Button from '../components/Button/Button';
import sunLogo from '../icons/sun.svg';
import moonLogo from '../icons/moon.svg';
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
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleBlur() {
    this.setState({ resetBtnMsg: '' });
  }

  async handleReset() {
    const { loggedUser } = this.props;
    await resetUserPassword(loggedUser);
    this.setState({ resetBtnMsg: 'Email to reset password was succesfully sent' });
  }

  handleThemeChange(theme) {
    const { setThemeContext, isLightTheme } = this.props;
    if ((isLightTheme && theme === 'light') || (!isLightTheme && theme === 'dark')) return;
    setThemeContext();
  }

  selectDarkTheme = () => this.handleThemeChange('dark');

  selectLightTheme = () => this.handleThemeChange('light');

  render() {
    const { resetBtnMsg } = this.state;
    const isResetted = resetBtnMsg !== '';
    const { isLightTheme } = this.props;
    const lightThemeButtonClass = isLightTheme ? `${classes.themeItem} ${classes.active}` : `${classes.themeItem}`;
    const darkThemeButtonClass = isLightTheme ? `${classes.themeItem}` : `${classes.themeItem} ${classes.active}`;

    return (
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Reset your password:</h2>
        <div className={classes.resetButton} onBlur={this.handleBlur}>
          <Button onClick={this.handleReset}>Click to reset</Button>
          {isResetted ? <div className={classes.resetText}>{resetBtnMsg}</div> : null}
        </div>
        <h2 className={classes.title}>Change color theme:</h2>
        <div className={classes.themeToggler}>
          <div
            className={lightThemeButtonClass}
            role='button'
            tabIndex={0}
            onKeyDown={this.selectLightTheme}
            onClick={this.selectLightTheme}
          >
            <span className={classes.themeTitle}>Light</span>
            <img className={classes.themeImg} src={sunLogo} alt='sun-logo' />
          </div>
          <div
            className={darkThemeButtonClass}
            role='button'
            tabIndex={0}
            onKeyDown={this.selectDarkTheme}
            onClick={this.selectDarkTheme}
          >
            <span className={classes.themeTitle}>Dark</span>
            <img className={classes.themeImg} src={moonLogo} alt='moon-logo' />
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  loggedUser: PropType.instanceOf(Object).isRequired,
  setThemeContext: PropType.func.isRequired,
  isLightTheme: PropType.bool.isRequired,
};
