import { UserContext } from '../RootProvider/userContext';
import { ThemeContext } from '../RootProvider/themeContext';
import Settings from '../../pages/Settings';

export default function SettingsWithContext(props) {
  return (
    <ThemeContext.Consumer>
      {(themeContext) => (
        <UserContext.Consumer>
          {(userContext) => <Settings {...props} {...userContext} {...themeContext} />}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
