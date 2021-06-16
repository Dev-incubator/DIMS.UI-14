import { UserContext } from '../../App/userContext';
import Menu from '../Aside/Menu/Menu';

export default function MenuWithContext() {
  return <UserContext.Consumer>{(userContext) => <Menu {...userContext} />}</UserContext.Consumer>;
}
