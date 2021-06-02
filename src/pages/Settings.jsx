import React from 'react';
import PropType from 'prop-types';
import Button from '../components/Button/Button';
import sunLogo from '../icons/sun.svg';
import moonLogo from '../icons/moon.svg';
import classes from './Settings.module.css';
import { resetUserPassword } from '../utilities/fb-helpers';
import { THEME_LIGHT, THEME_DARK, setGlobalTheme } from '../utilities/theme-helpers';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetBtnMsg: '',
      theme: '',
    };
  }

  componentDidMount() {
    const { theme } = this.props;
    this.setState({ theme });
  }

  handleBlur() {
    this.setState({ resetBtnMsg: '' });
  }

  handleReset = async () => {
    const { loggedUser } = this.props;
    await resetUserPassword(loggedUser);
    this.setState({ resetBtnMsg: 'Email to reset password was succesfully sent' });
  };

  toggleTheme = (themeName) => {
    const { theme } = this.state;
    if (theme === themeName) return;
    const nextTheme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    this.setState({ theme: nextTheme });
    setGlobalTheme(nextTheme);
  };

  selectDarkTheme = () => this.toggleTheme(THEME_DARK);

  selectLightTheme = () => this.toggleTheme(THEME_LIGHT);

  render() {
    const { resetBtnMsg, theme } = this.state;
    const isResetted = resetBtnMsg !== '';
    const lightThemeButtonClass =
      theme === THEME_LIGHT ? `${classes.themeItem} ${classes.active}` : `${classes.themeItem}`;
    const darkThemeButtonClass =
      theme === THEME_LIGHT ? `${classes.themeItem}` : `${classes.themeItem} ${classes.active}`;

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
  theme: PropType.string.isRequired,
};
