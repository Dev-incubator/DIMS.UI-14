import { UserContext } from '../../App/userContext';
import { ThemeContext } from '../../App/themeContext';
import Settings from '../../pages/Settings';

export default function SettingsWithContext(props) {
  return (
    <ThemeContext.Consumer>
      {(themeContext) => (
        <UserContext.Consumer>
          {(userContext) => <Settings {...props} {...userContext} theme={themeContext} />}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
