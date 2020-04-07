import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { backpackActions } from '../../_actions/';

class BackpackList extends Component {
  componentDidMount() {
    const { getAll } = this.props;

    getAll();
  };

  render() {
    const { backpacks, remove } = this.props;

    return (
      <table className="table">
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
                  onClick={() => remove(backpack.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
};

const mapStateToProps = (state) => {
  const { backpacks } = state.backpacks;

  return { backpacks };
};


const actionCreators = {
  getAll: backpackActions.getAll,
  remove: backpackActions.remove,
}

export default connect(mapStateToProps, actionCreators)(BackpackList);
