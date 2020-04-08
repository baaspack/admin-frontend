import React, { Component } from 'react';

class AddCollectionForm extends Component {
  state = {
    name: '',
    error: '',
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    const error = /\W/.test(value) ? 'Letters, numbers, and underscores only' : '';

    this.setState({
      error,
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name } = this.state;

    const { onSubmit } = this.props;

    onSubmit(name);

    this.setState({
      name: '',
    });
  }

  render() {
    const { name, error } = this.state;

    return (
      <form
        action=""
        className="add-collection-form"
        onSubmit={this.handleSubmit}
      >
        <div className="input-add-on">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Add new collection"
            onChange={this.handleInputChange}
          />
          <button
            type="submit"
            disabled={!!error}
          >
            Add
          </button>
        </div>
        <small className="status error">
          {error}
        </small>
      </form>
    );
  };
};

export default AddCollectionForm;
