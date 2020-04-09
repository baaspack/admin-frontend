import React, { Component } from 'react';
import { connect } from 'react-redux';

import { backpackUserActions } from '../../_actions';
import User from './User';
import AddUserForm from './AddUserForm';

class Users extends Component {
  state = {
    showUsers: false,
    showUser: false,
  }

  toggleStateProperty = (propName) => {
    this.setState((prevState) => {
      return {
        [propName]: !prevState[propName],
      }
    });
  };

  render() {
    const { showUser, showUsers } = this.state;
    const { backpackUsers, deleteUser } = this.props;

    const users = backpackUsers.map((user) => (
      <User
        key={user._id}
        _id={user._id}
        email={user.email}
        onDeleteClick={deleteUser}
      />
    ));

    return (
      <div className="users">
        <h2
          className="toggle-show"
          onClick={() => this.toggleStateProperty('showUsers')}
        >
          Users [{showUsers ? '-' : '+'}]
        </h2>
        {
          showUsers &&
          <div>
            <ul>
              {users}
            </ul>
            {
              showUser ?
              <AddUserForm toggleShowUser={() => this.toggleStateProperty('showUser') } /> :
              <button
                type="button"
                onClick={() => this.toggleStateProperty('showUser')}
              >
                Add User
              </button>
            }
          </div>
        }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  const { backpackUsers } = state;

  return { backpackUsers };
};

const actionCreators = {
  deleteUser: backpackUserActions.deleteUser,
};

export default connect(mapStateToProps, actionCreators)(Users);
