import {useContext} from 'react';
import {UserContext} from './User';

const Header = () => {
  const {currentUser} = useContext(UserContext)
  return <h1>Hello {currentUser.name}</h1>
}

export default Header;