import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { flashActions, userActions } from '../../_actions'

const Header = ({ isLoggedIn, logout, persistFlash, history }) => {
  const handleLogout = () => {
    logout()
      .then(() => {
        persistFlash();
        history.push('/');
      });
  };

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
          onClick={handleLogout}
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

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.user;

  return { isLoggedIn };
};

const actionCreators = {
  logout: userActions.logout,
  persistFlash: flashActions.persist,
};

export default connect(mapStateToProps, actionCreators)(withRouter(Header));
