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
    const { name, documents } = this.props;

    const documentList = documents.map((doc) => (
      <Document
        key={doc._id}
        collectionName={name}
        document={doc}
      />
    ));

    return (
      <div className="collection">
        <h3>{name}</h3>
        <ul>
          {documentList}
        </ul>
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
