import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useContext } from 'react';
import { ElementContext } from '../../context/ElementContext';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const { element, setElement } = useContext(ElementContext);

  return (

      <nav className="navbar">
        <NavLink to="/" className={"logo-link" + ` ${element}`}><img className="nav-logo" src={`/${element}-logo.png`} alt={`${element}bnb`} /> {element}bnb</NavLink>
        {isLoaded && (
          <ul className="navbar-right">
            {sessionUser ? <li><NavLink to="/spots/new" className={element}>Create a New Spot</NavLink></li> : null}
            {element === 'water' ? null : <li><button onClick={() => setElement('water')}>💧</button></li>}
            {element === 'fire' ? null : <li><button onClick={() => setElement('fire')}>🔥</button></li>}
          <li>
            <ProfileButton user={sessionUser} />
          </li>
          </ul>
        )}
      </nav>
  );
}

export default Navigation;