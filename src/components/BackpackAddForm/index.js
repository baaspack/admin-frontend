import React, { Component } from 'react';

class BackpackAddForm extends Component {
  state = {
    name: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const { name } = this.state;
    const { onAddSubmit } = this.props;

    e.preventDefault();

    onAddSubmit(name);
  }

  render() {
    const { name } = this.state;

    return (
      <form
        className="form-add-backpack"
        action="/backpacks"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <div className="vertical-form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.handleInputChange}
            autoFocus
          />
        </div>
        <div className="vertical-form-control">
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
};

export default BackpackAddForm;
