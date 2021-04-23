import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Aside from '../components/Aside/Aside';
import Main from '../components/Main/Main';
import classes from './App.module.css';
import { TOGGLE_MENU } from '../utilities/actionCreators';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        menu: {
          isOpen: true,
        },
      },
    };
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(action) {
    switch (action.type) {
      case TOGGLE_MENU:
        this.setState((prevState) => ({
          ...prevState,
          settings: {
            ...prevState.settings,
            menu: {
              isOpen: !prevState.settings.menu.isOpen,
            },
          },
        }));
        break;
      default:
        break;
    }
  }

  render() {
    const {
      settings: { menu },
    } = this.state;

    return (
      <BrowserRouter>
        <div className={classes.app}>
          <Aside menu={menu} />
          <Main menu={menu} dispatch={this.dispatch} />
        </div>
      </BrowserRouter>
    );
  }
}
