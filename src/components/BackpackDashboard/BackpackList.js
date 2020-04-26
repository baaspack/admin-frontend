import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { backpacksActions } from '../../_actions/';

import styles from './styles.module.css';

class BackpackList extends Component {
  componentDidMount() {
    const { getAll } = this.props;

    getAll();
  };

  handleRemoveFactory(backpackId) {
    const { remove } = this.props;
    const message = "You are about to delete your backpack, which cannot be undone. Are you sure?"

    return function handleRemove() {
      if (window.confirm(message)) {
        remove(backpackId);
      }
    }
  }

  render() {
    const { backpacks } = this.props;
    const classes = `${styles.backpackList} ${backpacks.length === 0 ? styles.backpackListNoItems : ''}`

    return (
      <section className={classes}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>API Key</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {backpacks.map((backpack) => (
              <tr key={backpack.id}>
                <td>
                  <Link to={`/backpacks/${backpack.name}`} >{backpack.name}</Link>
                </td>
                <td>{backpack.api_key}</td>
                <td>
                  <button
                    type="button"
                    onClick={this.handleRemoveFactory(backpack.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  };
};

const mapStateToProps = (state) => {
  const { backpacks } = state.backpacks;

  return { backpacks };
};


const actionCreators = {
  getAll: backpacksActions.getAll,
  remove: backpacksActions.remove,
}

export default connect(mapStateToProps, actionCreators)(BackpackList);
