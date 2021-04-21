import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Aside from '../components/Aside/Aside';
import Main from '../components/Main/Main';
import classes from './App.module.css';

//  Function Types
const TOGGLE_MENU = 'toggle-menu';

// Modal Types
const MODAL_DELETE_USER = 'user-delete';
const MODAL_DELETE_TASK = 'task-delete';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        menu: {
          isOpen: true,
          toggler: TOGGLE_MENU,
        },
        modalTypes: {
          deleteUser: MODAL_DELETE_USER,
          deleteTask: MODAL_DELETE_TASK,
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
              ...prevState.settings.menu,
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
    const { settings } = this.state;

    return (
      <BrowserRouter>
        <div className={classes.app}>
          <Aside settings={settings} />
          <Main settings={settings} dispatch={this.dispatch} />
        </div>
      </BrowserRouter>
    );
  }
}
