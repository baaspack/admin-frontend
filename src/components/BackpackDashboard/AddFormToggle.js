import React, { Component } from 'react';
import { connect } from 'react-redux';

import BackpackAddForm from './AddForm';
import { backpackActions } from '../../_actions/';


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
    const { add } = this.props;

    add(backpackName)
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

const actionCreators = {
  add: backpackActions.add,
};

export default connect(null, actionCreators)(BackpackAddFormToggle);
