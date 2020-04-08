import React, { Component } from 'react';
import { connect } from 'react-redux';

import { collectionsActions } from '../../_actions';

import Document from './Document';

class Collection extends Component {
  componentDidMount() {
    const { get, name } = this.props;
    get(name);
  }

  render() {
    const { name, documents, onToggleShowModal } = this.props;

    const documentList = documents.map((doc) => (
      <Document
        key={doc._id}
        collectionName={name}
        document={doc}
        onDocClick={onToggleShowModal}
      />
    ));

    return (
      <div className="collection">
        <h3>{name}</h3>
        <ul>
          {documentList}
        </ul>
        <button
          className="collection-add"
          type="button"
          onClick={() => onToggleShowModal(name)}
        >
          Add document
        </button>
      </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  const documents = state.collections[ownProps.name];

  return { documents };
};

const actionCreators = {
  get: collectionsActions.get,
};

export default connect(mapStateToProps, actionCreators)(Collection);
