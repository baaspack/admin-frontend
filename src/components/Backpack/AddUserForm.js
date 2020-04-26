import React, { Component } from 'react';
import { connect } from 'react-redux';

import { backpackUserActions } from '../../_actions';

import styles from './user_form.module.css';

class AddUserForm extends Component {
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

    const { addUser } = this.props;
    const { email, password } = this.state;

    addUser(email, password);

    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <form
        className={styles.form}
        action=""
        onSubmit={this.handleSubmit}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"
            value={email}
            onChange={this.handleInputChange}
            placeholder='Email'
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"
            minLength="3"
            value={password}
            onChange={this.handleInputChange}
            placeholder='Password'
            required
          />
        </div>

        <button type="submit">add</button>
      </form>
    );
  };
};

const actionCreators = {
  addUser: backpackUserActions.addUser,
}

export default connect(null, actionCreators)(AddUserForm);
