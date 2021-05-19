import classes from './Menu.module.css';
import logo from '../../../icons/logo.svg';
import MenuItem from './MenuItem/MenuItem';
import usersIcon from './icons/user.svg';
import tasksIcon from './icons/tasks.svg';
import logoutIcon from './icons/logout.svg';
import settingsIcon from './icons/settings.svg';

const menuList = [
  {
    title: 'Users',
    path: '/users',
    image: usersIcon,
  },
  {
    title: 'Workflow',
    path: '/main/tasks',
    image: tasksIcon,
  },
  {
    title: 'Settings',
    path: '/test2',
    image: settingsIcon,
  },
  {
    title: 'Logout',
    path: '/',
    image: logoutIcon,
  },
];
export default function Menu() {
  const menu = menuList.map((item, index) => {
    return <MenuItem key={index.toString()} title={item.title} path={item.path} image={item.image} />;
  });

  return (
    <menu className={classes.menu}>
      <div className={classes.header}>
        <img src={logo} alt='logo' />
        <div className={classes.title}>HyperCube</div>
      </div>
      <nav>{menu}</nav>
    </menu>
  );
}
