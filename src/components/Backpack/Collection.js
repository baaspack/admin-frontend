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

    const documentList = Object.keys(documents).map(( _id ) => (
      <Document
        key={_id}
        document={documents[_id]}
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
