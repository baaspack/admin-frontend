import React, { Component } from 'react';
import { connect } from 'react-redux';

import BackpackAddForm from './AddForm';
import { backpacksActions } from '../../_actions/';

import styles from './styles.module.css';

class AddButton extends Component {
  state = {
    showForm: false,
    error: ''
  };

  toggleShowForm = () => {
    this.setState((prevState) => (
      {
        showForm: !prevState.showForm,
        error: prevState.showForm ? '' : prevState.error,
      }
    ));
  };

  handleAddSubmit = (backpackName) => {
    const { add } = this.props;

    this.setState({
      error: ''
    });

    add(backpackName, (error) => this.setState({error}))
      .then((succeeded, message) => {
        if (succeeded) {
          this.toggleShowForm();
        } else {
          console.log(message)
        }
      });
  };

  render() {
    const { error, showForm } = this.state;

    return (
      <div className="clearfix">
        {
          showForm ? (
            <BackpackAddForm
              error={error}
              onModalClose={this.toggleShowForm}
              onAddSubmit={this.handleAddSubmit}
            />
          ) : null
        }

        <button
          className={styles.addButton}
          type="button"
          onClick={this.toggleShowForm}
        >
          create a backpack
        </button>
      </div>
    );
  }
};

const actionCreators = {
  add: backpacksActions.add,
};

export default connect(null, actionCreators)(AddButton);
