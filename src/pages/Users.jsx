import React from 'react';
import Button from '../components/Button/Button';
import classes from './Users.module.css';
import User from '../components/User/User';
import Modal from '../components/Modals/Modal';
import reducerFunc from '../utilities/reducer';
import { openCreateUserModal } from '../utilities/action-сreators';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedModal: '',
      usersList: [],
    };
    this.dispatch = this.dispatch.bind(this);
  }

  componentDidMount() {
    this.setState((prevState) => ({
      ...prevState,
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
    }));
  }

  dispatch(action) {
    this.setState((prevState) => reducerFunc(prevState, action));
  }

  render() {
    const { usersList, selectedModal, isOpen } = this.state;

    const users = usersList.map((user, index) => {
      return <User dispatch={this.dispatch} key={user.id.toString()} userData={user} tableIndex={index + 1} />;
    });

    const openCreateModal = () => {
      this.dispatch(openCreateUserModal());
    };

    return (
      <div>
        <div className={classes.header}>
          <h2 className={classes.title}>
            Users <span>({`${usersList.length}`})</span>
          </h2>
          <Button onClick={openCreateModal} roleclass='create'>
            Create
          </Button>
        </div>
        <div className={classes.content}>
          <div className={classes.subheader}>
            <div>№</div>
            <div>Full Name</div>
            <div>Direction</div>
            <div>Education</div>
            <div>Start</div>
            <div>Age</div>
            <div>Controls</div>
          </div>
          {users}
        </div>
        {isOpen ? <Modal dispatch={this.dispatch} selectedModal={selectedModal} /> : null}
      </div>
    );
  }
}
