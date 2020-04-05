import React, { Component } from 'react';
import BackpackAddForm from '../BackpackAddForm';

class BackpackAddFormToggle extends Component {
  state = {
    showForm: false,
  }

  toggleShowForm = () => {
    this.setState((prevState) => (
      {
        showForm: !prevState.showForm,
      }
    ));
  };

  handleAddSubmit = (backpackName) => {
    const { onAddSubmit } = this.props;

    onAddSubmit(backpackName)
      .then((succeeded) => {
        if (succeeded) {
          this.toggleShowForm();
        }
      });
  };

  render() {
    const { showForm } = this.state;

    return showForm ?
      <BackpackAddForm onAddSubmit={this.handleAddSubmit} /> :
      <button
        type="button"
        onClick={this.toggleShowForm}
      >
        Create a backpack!
      </button>
  }
};

export default BackpackAddFormToggle;
