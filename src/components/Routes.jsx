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
import MenuItem from './Aside/Menu/MenuItem/MenuItem';
import SettingsWithContext from './ContextHOCs/SettingsWithContext';
import rolesPack from '../utilities/rolesPack';

const { admin, mentor, user } = rolesPack;

const paths = [
  { isExact: true, path: '/main/users', permissions: [admin, mentor], component: UsersWithContext },
  { isExact: true, path: '/main/tasks', permissions: [admin, mentor], component: Tasks },
  {
    isExact: true,
    path: '/main/users/:userId/tasks',
    permissions: [admin, mentor, user],
    component: UsersTasksWithContext,
  },
  {
    isExact: true,
    path: '/main/users/:userId/tasks/:taskId/track',
    permissions: [admin, mentor, user],
    component: UsersTracks,
  },
  { isExact: true, path: '/main/users/:userId/progress', permissions: [admin, user], component: UsersProgress },
  { isExact: true, path: '/main/settings', permissions: [admin, mentor, user], component: SettingsWithContext },
  { isExact: false, path: '', permissions: [admin, mentor, user], component: PageNotFound },
];

// {role} destructures from loggedUser
export const getRoleDependedRoutes = ({ role }) => {
  return (
    <Switch>
      {paths
        .filter((pathObj) => pathObj.permissions.includes(role))
        .map((path, index) => (
          <Route key={index.toString()} exact={path.isExact} path={path.path} component={path.component} />
        ))}
    </Switch>
  );
};

const menuList = [
  {
    title: 'Users',
    path: '/main/users',
    image: usersIcon,
    permissions: [admin, mentor],
  },
  {
    title: 'Workflow',
    path: '/main/tasks',
    image: tasksIcon,
    permissions: [admin, mentor],
  },
  {
    title: 'Settings',
    path: '/main/settings',
    image: settingsIcon,
    permissions: [admin, mentor, user],
  },
];

// {role} destructures from loggedUser
export const getRoleDependedMenuLinks = ({ role }) => {
  return menuList
    .filter((menuObj) => menuObj.permissions.includes(role))
    .map((menuObj, index) => (
      <MenuItem key={index.toString()} title={menuObj.title} path={menuObj.path} image={menuObj.image} />
    ));
};
