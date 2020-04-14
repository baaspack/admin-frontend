import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, flashActions } from '../../_actions';

import Header from '../Header';
import LoginForm from '../LoginForm';
import FlashMessage from '../FlashMessage';
import BackpackDashboard from '../BackpackDashboard';
import Backpack from '../Backpack';

class App extends Component {
  componentDidMount() {
    const { isLoggedIn } = this.props;

    isLoggedIn();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      const { clearFlash } = this.props;

      clearFlash();
    }
  }

  render() {
    const { isLoggedIn, loading } = this.props.user;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <Header />

        <FlashMessage />

        <Switch>
          <Route path="/:formType(login|register)">
            { isLoggedIn ? <Redirect to="/" /> : <LoginForm /> }
          </Route>
          <Route path="/backpacks/:backpackName">
            { !isLoggedIn ? <Redirect to="/login" /> : <Backpack /> }
          </Route>
          <Route path="/backpacks">
            { !isLoggedIn ? <Redirect to="/login" /> : <BackpackDashboard /> }
          </Route>
          <Route path="/">
            <p>Welcome</p>
          </Route>
        </Switch>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  const { user } = state;

  return { user };
}

const actionCreators = {
  isLoggedIn: userActions.isLoggedIn,
  clearFlash: flashActions.clear,
};

export default connect(mapStateToProps, actionCreators)(withRouter(App));
