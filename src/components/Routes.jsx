import { Route, Switch } from 'react-router-dom';
import UsersWithContext from './ContextHOCs/UsersWithContext';
import Tasks from '../pages/Tasks';
import UsersTasksWithContext from './ContextHOCs/UsersTasksWithContext';
import UsersTracks from '../pages/UsersTracks';
import UsersProgress from '../pages/UsersProgress';
import PageNotFound from '../pages/PageNotFound';
import settingsIcon from '../icons/settings.svg';
import usersIcon from '../icons/user.svg';
import tasksIcon from '../icons/tasks.svg';
import WorkFlowIcon from '../icons/workflow.svg';
import MenuItem from './Aside/Menu/MenuItem/MenuItem';
import SettingsWithContext from './ContextHOCs/SettingsWithContext';

const paths = [
  { isExact: true, path: '/main/users', component: UsersWithContext },
  { isExact: true, path: '/main/tasks', component: Tasks },
  { isExact: true, path: '/main/users/:userId/tasks', component: UsersTasksWithContext },
  { isExact: true, path: '/main/users/:userId/tasks/:taskId/track', component: UsersTracks },
  { isExact: true, path: '/main/users/:userId/progress', component: UsersProgress },
  { isExact: true, path: '/main/settings', component: SettingsWithContext },
  { isExact: false, path: '', component: PageNotFound },
];

const adminAndMentorPermissions = [0, 1, 2, 3, 4, 5, 6];
const userPermissions = [2, 3, 5, 6];

export const getRoleDependedRoutes = (loggedUser) => {
  let permissionsList = null;
  if (loggedUser.role === 'Admin' || loggedUser.role === 'Mentor') {
    permissionsList = adminAndMentorPermissions;
  } else if (loggedUser.role === 'User') {
    permissionsList = userPermissions;
  }

  const routePack = permissionsList.map((item) => {
    return (
      <Route
        key={item.toString()}
        exact={paths[item].isExact}
        path={paths[item].path}
        component={paths[item].component}
      />
    );
  });

  return <Switch>{routePack}</Switch>;
};

export const getRoleDependedMenuLinks = (loggedUser) => {
  const menuList = [
    {
      title: 'Users',
      path: '/main/users',
      image: usersIcon,
    },
    {
      title: 'Tasks',
      path: '/main/tasks',
      image: tasksIcon,
    },
    {
      title: 'WorkFlow',
      path: `/main/users/${loggedUser.id}/tasks`,
      image: WorkFlowIcon,
    },
    {
      title: 'Settings',
      path: '/main/settings',
      image: settingsIcon,
    },
  ];

  const adminAndMentorMenuList = [0, 1, 3];
  const userMenuList = [2, 3];

  const isUser = loggedUser.role === 'User';
  let roleDependendMenuList = null;
  if (!isUser) {
    roleDependendMenuList = adminAndMentorMenuList;
  } else if (isUser) {
    roleDependendMenuList = userMenuList;
  }

  return roleDependendMenuList.map((item) => (
    <MenuItem
      key={item.toString()}
      title={menuList[item].title}
      path={menuList[item].path}
      image={menuList[item].image}
    />
  ));
};
