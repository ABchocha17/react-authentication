import { Link } from 'react-router-dom';
import {useFirebase} from '../context/firebase';
const Header = () => {
  const Firebase = useFirebase();
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!Firebase.logUser ? <>
            <li><Link to="/sighup">SighUp</Link></li>
            <li><Link to="/sighin">SighIn</Link></li>
          </>:<>
            <li><Link to="/profile">profile</Link></li>
          </>}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
