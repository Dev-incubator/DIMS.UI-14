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
import { ROLES } from '../utilities/enums';

const paths = [
  { isExact: true, path: '/main/users', permissions: [ROLES.ADMIN, ROLES.MENTOR], component: UsersWithContext },
  { isExact: true, path: '/main/tasks', permissions: [ROLES.ADMIN, ROLES.MENTOR], component: Tasks },
  {
    isExact: true,
    path: '/main/users/:userId/tasks',
    permissions: [ROLES.ADMIN, ROLES.MENTOR, ROLES.USER],
    component: UsersTasksWithContext,
  },
  {
    isExact: true,
    path: '/main/users/:userId/tasks/:taskId/track',
    permissions: [ROLES.ADMIN, ROLES.MENTOR, ROLES.USER],
    component: UsersTracks,
  },
  {
    isExact: true,
    path: '/main/users/:userId/progress',
    permissions: [ROLES.ADMIN, ROLES.MENTOR],
    component: UsersProgress,
  },
  {
    isExact: true,
    path: '/main/settings',
    permissions: [ROLES.ADMIN, ROLES.MENTOR, ROLES.USER],
    component: SettingsWithContext,
  },
  { isExact: false, path: '', permissions: [ROLES.ADMIN, ROLES.MENTOR, ROLES.USER], component: PageNotFound },
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

export const getRoleDependedMenuLinks = ({ id, role }) => {
  const menuList = [
    {
      title: 'Users',
      path: '/main/users',
      image: usersIcon,
      permissions: [ROLES.ADMIN, ROLES.MENTOR],
    },
    {
      title: 'Tasks',
      path: '/main/tasks',
      image: tasksIcon,
      permissions: [ROLES.ADMIN, ROLES.MENTOR],
    },
    {
      title: 'WorkFlow',
      path: `/main/users/${id}/tasks`,
      image: WorkFlowIcon,
      permissions: [ROLES.USER],
    },
    {
      title: 'Settings',
      path: '/main/settings',
      image: settingsIcon,
      permissions: [ROLES.ADMIN, ROLES.MENTOR, ROLES.USER],
    },
  ];

  return menuList
    .filter((menuObj) => menuObj.permissions.includes(role))
    .map((menuObj, index) => (
      <MenuItem key={index.toString()} title={menuObj.title} path={menuObj.path} image={menuObj.image} />
    ));
};
