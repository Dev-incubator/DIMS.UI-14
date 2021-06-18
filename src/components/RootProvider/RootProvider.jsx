import React from 'react';
import PropTypes from 'prop-types';
import {
  getGlobalTheme,
  setUserContext,
  getUserContext,
  setGlobalTheme,
  applyGlobalTheme,
} from '../../utilities/context-helpers';
import { THEMES } from '../../utilities/enums';
import { UserContext } from './userContext';
import { ThemeContext } from './themeContext';

export default class RootProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userContext: {
        ...getUserContext(),
        setUserContext: this.setUserContext,
      },

      themeContext: {
        theme: getGlobalTheme(),
        setThemeContext: this.setThemeContext,
      },
    };
  }

  componentDidMount() {
    const {
      themeContext: { theme },
    } = this.state;
    applyGlobalTheme(theme);
  }

  componentDidUpdate() {
    const {
      themeContext: { theme },
    } = this.state;
    applyGlobalTheme(theme);
  }

  setUserContext = (loggedUser) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        userContext: {
          ...prevState.userContext,
          loggedUser,
          isLogged: !prevState.userContext.isLogged,
        },
      }),
      this.updateUserContext,
    );
  };

  updateUserContext = () => {
    const { userContext } = this.state;
    setUserContext(userContext);
  };

  setThemeContext = (themeName) => {
    const {
      themeContext: { theme },
    } = this.state;
    if (theme === themeName) return;
    const nextTheme = theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    this.setState(
      (prevState) => ({
        ...prevState,
        themeContext: {
          ...prevState.themeContext,
          theme: nextTheme,
        },
      }),
      this.updateThemeContext,
    );
  };

  updateThemeContext = () => {
    const {
      themeContext: { theme },
    } = this.state;
    setGlobalTheme(theme);
  };

  render() {
    const { themeContext, userContext } = this.state;
    const { children } = this.props;

    return (
      <ThemeContext.Provider value={themeContext}>
        <UserContext.Provider value={userContext}>{React.cloneElement(children, { userContext })}</UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

RootProvider.propTypes = {
  children: PropTypes.node,
};

RootProvider.defaultProps = {
  children: '',
};
