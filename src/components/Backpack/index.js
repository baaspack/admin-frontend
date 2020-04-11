import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  backpackActions,
  wsActions,
  collectionsActions,
  backpackUserActions,
} from '../../_actions';

import AddCollectionForm from './AddCollectionForm';
import AddZipForm from './AddZipForm';
import Collection from './Collection';
import PropertyEditModal from './DocumentEditModal';
import BackpackUsers from './Users';

class Backpack extends Component {
  state = {
    showModal: false,
    modalCollection: null,
    modalDoc: null,
  };

  componentDidMount() {
    const { get, wsConnect } = this.props;
    const { backpackName } = this.props.match.params;

    get(backpackName)
      .then(() => {
        const hostname = window.location.host;
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        wsConnect(`${protocol}://${hostname.replace('admin', 'admin-be')}/backpacks/${backpackName}`);
      })
  };

  componentWillUnmount() {
    const { clearCollections, clearUsers } = this.props;
    clearCollections();
    clearUsers();
  }

  toggleShowModal = (modalCollection, modalDoc) => {
    this.setState((prevState) => {
      return {
        modalCollection,
        modalDoc,
        showModal: !prevState.showModal,
      }
    });
  };

  render() {
    const { backpack, collections, addCollection } = this.props;
    const { showModal, modalCollection, modalDoc } = this.state;
    const collectionNames = Object.keys(collections);

    return (
      <div className="backpack">
        <h1>Backpack: {backpack.name || 'Loading...'}</h1>

        <AddZipForm backpackName={backpack.name} />

        <BackpackUsers />

        <h2>Collections</h2>
        <AddCollectionForm onSubmit={addCollection}/>

        {
          collectionNames
            .map((colName) => (
              <Collection
                key={`${backpack.name}-${colName}`}
                name={colName}
                onToggleShowModal={this.toggleShowModal}
              />
          ))
        }

        {
          showModal &&
          <PropertyEditModal
            onCloseClick={this.toggleShowModal}
            collection={modalCollection}
            document={modalDoc}
          />
        }
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
  clearCollections: collectionsActions.clearAll,
  clearUsers: backpackUserActions.clearAll,
  addCollection: collectionsActions.addCollection,
  wsConnect: wsActions.connect,
};

export default connect(mapStateToProps, actionCreators)(withRouter(Backpack));
