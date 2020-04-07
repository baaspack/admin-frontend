import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { backpackActions, wsActions } from '../../_actions';

import Collection from './Collection';
import Modal from './Modal';

class Backpack extends Component {
  componentDidMount() {
    const { get, wsConnect } = this.props;
    const { backpackName } = this.props.match.params;

    get(backpackName)
      .then(() => {
        // when DNS is working... `/backpacks/${backpack.name}`,
        wsConnect('ws://localhost:4000');
      })
  };

  render() {
    const { backpack, collections } = this.props;
    const collectionNames = Object.keys(collections);

    return (
      <div className="backpack">
        <h1>Backpack: {backpack.name || 'Loading...'}</h1>
        <h2>Collections</h2>
          {collectionNames
            .map((colName) => (
              <Collection
                key={colName}
                name={colName}
              />
          ))}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { backpack, collections } = state;

  return { backpack, collections };
};

const actionCreators = {
  get: backpackActions.get,
  wsConnect: wsActions.connect,
};

export default connect(mapStateToProps, actionCreators)(withRouter(Backpack));
