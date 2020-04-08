import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { backpackActions, wsActions, collectionsActions } from '../../_actions';

import AddCollectionForm from './AddCollectionForm';
import Collection from './Collection';
import PropertyEditModal from './DocumentEditModal';

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
        // when DNS is working... `/backpacks/${backpack.name}`,
        wsConnect('ws://localhost:4000');
      })
  };

  componentWillUnmount() {
    const { clearCollections } = this.props;
    clearCollections();
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
  addCollection: collectionsActions.addCollection,
  wsConnect: wsActions.connect,
};

export default connect(mapStateToProps, actionCreators)(withRouter(Backpack));
