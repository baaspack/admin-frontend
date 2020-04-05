import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    const { onSubmit, match } = this.props;
    const { email, password } = this.state;

    onSubmit(match.params.formType, email, password);
  };

  render() {
    const { email, password } = this.state;
    const { match } = this.props;
    const formType = match.params.formType === 'login' ? 'Log in' : 'Register';

    return (
      <form
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

        <div className="vertical-form-control">
          <button type="submit">
            {formType}
          </button>
        </div>
      </form>
    );
  };
};

export default withRouter(LoginForm);
