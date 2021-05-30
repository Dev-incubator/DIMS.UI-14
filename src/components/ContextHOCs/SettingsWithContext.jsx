import { UserContext } from '../../App/userContext';
import Settings from '../../pages/Settings';

export default function SettingsWithContext(props) {
  return <UserContext.Consumer>{(userContext) => <Settings {...props} {...userContext} />}</UserContext.Consumer>;
}
