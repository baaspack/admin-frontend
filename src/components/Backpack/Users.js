import React, { Component } from 'react';
import { connect } from 'react-redux';

import { backpackUserActions } from '../../_actions';
import User from './User';
import AddUserForm from './AddUserForm';

import styles from './users.module.css';

class Users extends Component {
  render() {
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
        <h2 className={styles.header}>users</h2>

        <div className={`${styles.contentSection} ${users.length ? styles.contentSectionWithUsers : ''}`}>
          <AddUserForm />
          {
            users.length ? (
              <table className={styles.usersTable}>
                <tbody>{users}</tbody>
              </table>
            ) : null
          }
        </div>
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
