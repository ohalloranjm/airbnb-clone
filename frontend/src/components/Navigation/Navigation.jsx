import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
      <ul className="navbar">
        <li>
        <NavLink to="/"><img className="nav-logo" src="/logo.png" alt="waterbnb" /> waterbnb</NavLink>
        </li>
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
  );
}

export default Navigation;