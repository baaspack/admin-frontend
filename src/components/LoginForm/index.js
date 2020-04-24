import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, flashActions } from '../../_actions';

import styles from './styles.module.css';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { history, match, register, login } = this.props;
    const { email, password } = this.state;

    const { formType } = match.params;

    const action = formType === 'register' ? register : login;

    action(email, password)
      .then(() => {
        this.props.persistFlash();
        history.push('/backpacks');
      })
      .catch(console.log);
  }

  render() {
    const { email, password } = this.state;
    const { match } = this.props;
    const formType = match.params.formType === 'login' ? 'Log in' : 'Register';

    return (
      <form
        className={styles.form}
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <h1>{formType}</h1>
        <div className="vertical-form-control">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            autoFocus
          />
        </div>

        <div className="vertical-form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
        </div>

        <div className={styles.separator}></div>

        <div className="vertical-form-control">
          <button type="submit">
            {formType}
          </button>
        </div>
      </form>
    );
  };
};

const actionCreators = {
  register: userActions.register,
  login: userActions.login,
  persistFlash: flashActions.persist,
};

export default connect(null, actionCreators)(withRouter(LoginForm));
