import React, { Component }from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

import apiClient from '../../lib/apiClient';

import Header from '../Header';
import LoginForm from '../LoginForm';
import FlashMessage from '../FlashMessage';
import BackpackDashboard from '../BackpackDashboard';
import Backpack from '../Backpack';

class App extends Component {
  state = {
    isLoggedIn: false,
    flash: null,
    loading: true,
  };

  componentDidMount() {
    apiClient.send('GET', 'isLoggedIn')
      .then((res) => {
        this.setState({
          loading: false,
          isLoggedIn: res.isLoggedIn,
        });
      })
      .catch((err) => {
        this.setState({
          flash: {
            type: 'error',
            message: err,
          }
        });
      });
  };

  handleFlash = (flash) => {
    this.setState({
      flash,
    });
  };

  handleLogin = async (formType, email, password) => {
    const reqBody = { email, password };

    try {
      const { message } = await apiClient.send('POST', formType, reqBody);

      this.setState({
        isLoggedIn: formType === 'login',
        flash: { type: 'ok', message },
      });

      this.props.history.push('/login');
    } catch (err) {
      this.setState({
        isLoggedIn: false,
        flash: { type: 'error', message: err },
      });
    }
  };

  handleLogout = async () => {
    try {
      const { message } = await apiClient('POST', 'logout');

      this.setState({
        isLoggedIn: false,
        flash: { type: 'ok', message },
      });

      this.props.history.push('/');
    } catch (err) {
      this.setState({
        flash: { type: 'error', err },
      });
    }
  };

  render() {
    const { isLoggedIn, flash, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLogoutClick={this.handleLogout} />

        <FlashMessage flash={flash} onFlashCloseClick={() => this.handleFlash(null)} />

        <Switch>
          <Route path="/:formType(login|register)">
            { isLoggedIn ? <Redirect to="/" /> : <LoginForm onSubmit={this.handleLogin} /> }
          </Route>
          <Route path="/backpacks/:backpackName">
            { !isLoggedIn ? <Redirect to="/login" /> : <Backpack handleFlash={this.handleFlash}/> }
          </Route>
          <Route path="/backpacks">
            { !isLoggedIn ? <Redirect to="/login" /> : <BackpackDashboard handleFlash={this.handleFlash}/> }
          </Route>
          <Route path="/">
            <p>Welcome</p>
          </Route>
        </Switch>
      </div>
    );
  };
};

export default withRouter(App);
