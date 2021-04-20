import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Aside from '../components/Aside/Aside';
import Main from '../components/Main/Main';
import classes from './App.module.css';

const TOGGLE_MENU = 'toggle-menu';
const TOGGLE_MODAL = 'toggle-modal';
// const MEMBER_DELETE = 'delete-current-member';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        menu: {
          isOpen: true,
          toggler: TOGGLE_MENU,
        },
        modal: {
          isOpen: false,
          toggler: TOGGLE_MODAL,
          type: '',
          types: {
            memberDelete: 'member-delete',
            memberCreate: 'member-create',
            memberProgress: 'member-progress',
            memberEdit: 'member-edit',
          },
        },
      },
      data: {
        tasksList: [
          {
            id: 1,
            taskName: 'Create database project',
            description: 'Create database project in firebase',
            startDate: '01.11.2020',
            deadline: '07.11.2020',
          },
          {
            id: 2,
            taskName: 'Create repositories',
            description: 'Create tasks, members, progress repositories',
            startDate: '07.11.2020',
            deadline: '14.11.2020',
          },
          {
            id: 3,
            taskName: 'Create unit tests for repositories',
            description: '',
            startDate: '07.11.2020',
            deadline: '21.11.2020',
          },
          {
            id: 4,
            taskName: 'Create services',
            description: '',
            startDate: '18.11.2020',
            deadline: '25.11.2020',
          },
          {
            id: 5,
            taskName: 'Create unit tests for services',
            description: '',
            startDate: '18.11.2020',
            deadline: '30.11.2020',
          },
          {
            id: 6,
            taskName: 'Create controllers',
            description: '',
            startDate: '01.12.2020',
            deadline: '07.12.2020',
          },
          {
            id: 7,
            taskName: 'Create unit tests for controllers',
            description: '',
            startDate: '01.12.2020',
            deadline: '14.12.2020',
          },
          {
            id: 8,
            taskName: 'Create views',
            description: '',
            startDate: '14.12.2020',
            deadline: '21.12.2020',
          },
        ],
        usersList: [
          {
            id: 1,
            fullname: 'Aliaksandr Razumny',
            direction: 'React',
            education: 'BNTU',
            start: '01.04.2021',
            age: 25,
          },
          {
            id: 2,
            fullname: 'Joe Baiden',
            direction: '.NET',
            education: 'University of Pennsylvania',
            start: '25.03.2021',
            age: 78,
          },
          {
            id: 3,
            fullname: 'Vladimir Putin',
            direction: 'Java',
            education: 'LGU',
            start: '15.04.2021',
            age: 68,
          },
          {
            id: 4,
            fullname: 'Angela Merkel',
            direction: 'Salesforce',
            education: 'Hamburg Univercity',
            start: '12.04.2021',
            age: 66,
          },
          {
            id: 5,
            fullname: 'Barack Obama',
            direction: 'PHP',
            education: 'Harvard Univercity',
            start: '29.03.2021',
            age: 59,
          },
          {
            id: 6,
            fullname: 'Xí Jìnpíng',
            direction: 'React',
            education: 'Beijin Univercity',
            start: '10.04.2021',
            age: 67,
          },
          {
            id: 7,
            fullname: 'Emmanuel Makron',
            direction: '.NET',
            education: 'Paris Univercity',
            start: '05.04.2021',
            age: 43,
          },
        ],
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
      case TOGGLE_MODAL:
        this.setState((prevState) => ({
          ...prevState,
          settings: {
            ...prevState.settings,
            modal: {
              ...prevState.settings.modal,
              type: action.modaltype,
              isOpen: !prevState.settings.modal.isOpen,
            },
          },
        }));
        break;
      // case MEMBER_DELETE:
      //   this.setState((prevState) => ({
      //     ...prevState,
      //     data: {
      //       ...prevState.data,
      //       members: prevState.data.members.splice(action.deleteID, 1),
      //     },
      //   }));
      //   break;
      default:
        break;
    }
  }

  render() {
    const { data, settings } = this.state;

    return (
      <BrowserRouter>
        <div className={classes.app}>
          <Aside settings={settings} />
          <Main settings={settings} dispatch={this.dispatch} data={data} />
        </div>
      </BrowserRouter>
    );
  }
}
