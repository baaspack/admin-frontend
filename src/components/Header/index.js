import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Header = ({ isLoggedIn, onLogoutClick }) => {
  const signInLinks = (
    <ul>
      <li>
        <Link to="/login">Log in</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </ul>
  );

  const authedLinks = (
    <ul>
      <li>
        <Link to="/backpacks">Backpacks</Link>
      </li>
      <li>
        <button
          className="button-link"
          type="button"
          onClick={onLogoutClick}
        >
          Log out
        </button>
      </li>
    </ul>
  );

  return (
    <header>
      <nav>
        {isLoggedIn ? authedLinks : signInLinks }
      </nav>
    </header>
  )
};

export default Header;
