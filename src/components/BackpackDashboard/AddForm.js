import React, { Component } from 'react';
import Modal from '../App/Modal';

import styles from './styles.module.css';

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
    e.preventDefault();

    const { name } = this.state;
    const { onAddSubmit } = this.props;


    onAddSubmit(name);
  }

  render() {
    const { name } = this.state;
    const { error } = this.props;

    return (
      <Modal
        onClose={this.props.onModalClose}
        title="create a backpack"
      >
        <form
          action="/backpacks"
          className={styles.createBackpack}
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
          {error && <p className={styles.createError}>{error}</p>}
          <div className="vertical-form-control">
            <button type="submit">Submit</button>
          </div>
        </form>
      </Modal>
    );
  }
};

export default BackpackAddForm;
