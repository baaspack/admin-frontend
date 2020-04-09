import React, { Component } from 'react';
import { connect } from 'react-redux';

import { backpackUserActions } from '../../_actions';

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

    const { addUser, toggleShowUser } = this.props;
    const { email, password } = this.state;

    addUser(email, password);
    toggleShowUser();

    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <form
        className="add-user-form"
        action=""
        onSubmit={this.handleSubmit}
      >
        <div className="horizontal-form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email"
            value={email}
            onChange={this.handleInputChange}
            autoFocus
            required
          />
        </div>

        <div className="horizontal-form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password"
            minLength="3"
            value={password}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <button type="submit">
          Add User
        </button>
      </form>
    );
  };
};

const actionCreators = {
  addUser: backpackUserActions.addUser,
}

export default connect(null, actionCreators)(AddUserForm);
