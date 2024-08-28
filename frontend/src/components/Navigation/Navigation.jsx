import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
      <nav className="navbar">
        <NavLink to="/" className="logo-link"><img className="nav-logo" src="/logo.png" alt="waterbnb" /> waterbnb</NavLink>
        {isLoaded && (
          <ul className="navbar-right">
            {sessionUser ? <li><NavLink to="/spots/new">Create a New Spot</NavLink></li> : null}
          <li>
            <ProfileButton user={sessionUser} />
          </li>
          </ul>
        )}
      </nav>
  );
}

export default Navigation;