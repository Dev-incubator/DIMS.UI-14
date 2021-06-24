import { RiAdminFill } from 'react-icons/ri';
import { FaUserAlt, FaUserGraduate } from 'react-icons/fa';
import loginImg from '../images/Login.png';
import usersImg from '../images/users.png';
import tasksImg from '../images/tasks.png';
import manageTasksImg from '../images/UsersTasks.png';
import progressImg from '../images/Progress.png';
import currentTasks from '../images/currentTasks.png';
import tracksImg from '../images/Tracks.png';
import html5 from '../images/html5.svg';
import css3 from '../images/css3.svg';
import js from '../images/js.svg';
import reactImg from '../images/react.svg';
import firebaseImg from '../images/firebase.svg';
import reduxImg from '../images/redux.svg';

export const features = [
  {
    img: loginImg,
    title: 'Login System',
    descr:
      'App provides login page for your account according to your credentials. Also you can login with Google Authentication.',
  },
  {
    img: usersImg,
    title: 'Manage Users',
    descr: 'You can manage your users: create users, including fields validation, edit and delete current users.',
  },
  {
    img: tasksImg,
    title: 'Manage Tasks',
    descr:
      'You can manage your tasks: create tasks, including fields validation, assign tasks to users, edit and delete tasks.',
  },
  {
    img: manageTasksImg,
    title: 'Control Users Tasks Completion',
    descr: 'You can set task status: complete, fail, active/reactive tasks users has been assigned.',
  },
  {
    img: progressImg,
    title: 'View Progress',
    descr: 'You can view progress of each included user.',
  },
  {
    img: currentTasks,
    title: 'View Tasks Assigned to You',
    descr: "You can view assigned tasks, every task's status, task name, start date and deadline.",
  },
  {
    img: tracksImg,
    title: 'Manage Tracks',
    descr: 'You can manage your task tracks: create, edit and delete.',
  },
];

export const roles = [
  {
    title: 'Admin',
    img: <RiAdminFill />,
    list: [
      'Watch the User&apos;s Manage Grid',
      "Add, edit and delete a User on User's Manage Grid",
      "Watch the User's Progress Grid",
      'Watch the Tasks Manage Grid',
      'Add, edit and delete Tasks',
      "Watch the User's Task Manage Grid",
      "Set the User's Task's Status",
    ],
  },
  {
    title: 'Mentor',
    img: <FaUserGraduate />,
    list: [
      "Watch the User's Manage Grid",
      "Watch the User's Progress Grid",
      'Watch the Tasks Manage Grid',
      'Add, edit and delete Tasks',
      "Watch the User's Task Manage Grid",
      "Set the User's Task's Status",
    ],
  },
  {
    title: 'User',
    img: <FaUserAlt />,
    list: [
      'Watch the Tasks Manage Grid',
      'Watch the Tracks Manage Grid of the current Task',
      'Add, edit and delete a Tracks of the current Task',
    ],
  },
];

export const techs = [
  {
    title: 'HTLM5',
    img: html5,
    descr: 'Creates a structure of an App. The fifth version allow to created more SEO-optimized structure.',
  },
  {
    title: 'CSS3',
    img: css3,
    descr: 'It helps to create absolutely any appearance of an App. Everything is limited of your fantasy.',
  },
  {
    title: 'JavaScript',
    img: js,
    descr: 'Allows to create any logic of an App: manage data, receiving and posting data from the server, etc.',
  },
  {
    title: 'React',
    img: reactImg,
    descr: 'This library helps to create web-SPA. The most interactive App for your goals can be created with it.',
  },
  {
    title: 'Firebase',
    img: firebaseImg,
    descr: "It's noSQL database, which stores data of an App. Also firebase can be user for authentication.",
  },
  {
    title: 'Redux',
    img: reduxImg,
    descr: "It's a predictable state container for JS Apps. Allow you to easy manage an App's state.",
  },
];
