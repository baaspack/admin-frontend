import React, { Component } from 'react';

import styles from './collection_form.module.css';

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
        className={styles.form}
        onSubmit={this.handleSubmit}
      >
        <div>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Add new collection"
            onChange={this.handleInputChange}
          />
        </div>
        <button
          type="submit"
          disabled={!!error}
        >
          add
        </button>

        {
          error ? (
            <div>
              <small className="status error">
                {error}
              </small>
            </div>
          ) : null
        }
      </form>
    );
  };
};

export default AddCollectionForm;
