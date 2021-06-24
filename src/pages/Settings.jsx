import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button/Button';
import ThemeButton from '../components/Button/ThemeButton';
import classes from './Settings.module.css';
import { resetUserPassword } from '../utilities/fb-helpers';
import { THEMES } from '../utilities/enums';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetBtnMsg: '',
    };
  }

  handleBlur() {
    this.setState({ resetBtnMsg: '' });
  }

  handleReset = async () => {
    const { loggedUser } = this.props;
    await resetUserPassword(loggedUser);
    this.setState({ resetBtnMsg: 'Email to reset password was succesfully sent' });
  };

  selectDarkTheme = () => {
    const { setThemeContext } = this.props;
    setThemeContext(THEMES.DARK);
  };

  selectLightTheme = () => {
    const { setThemeContext } = this.props;
    setThemeContext(THEMES.LIGHT);
  };

  render() {
    const { resetBtnMsg } = this.state;
    const { theme } = this.props;
    const isResetted = resetBtnMsg !== '';

    return (
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Reset your password:</h2>
        <div className={classes.resetButton} onBlur={this.handleBlur}>
          <Button onClick={this.handleReset} onScreen>
            Click to reset
          </Button>
          {isResetted ? <div className={classes.resetText}>{resetBtnMsg}</div> : null}
        </div>
        <h2 className={classes.title}>Change color theme:</h2>
        <div className={classes.themeToggler}>
          <ThemeButton onClick={this.selectLightTheme} isActive={theme === THEMES.LIGHT}>
            {THEMES.LIGHT}
          </ThemeButton>
          <ThemeButton onClick={this.selectDarkTheme} isActive={theme === THEMES.DARK} position='right'>
            {THEMES.DARK}
          </ThemeButton>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  loggedUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
  theme: PropTypes.string.isRequired,
  setThemeContext: PropTypes.func.isRequired,
};
