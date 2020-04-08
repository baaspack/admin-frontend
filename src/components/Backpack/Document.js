import React, { Component } from 'react';
import { connect } from 'react-redux';

import { collectionsActions } from '../../_actions';
import Property from './Property';

const blacklist = ['_id', 'createdAt', 'updatedAt', '__v'];

class Document extends Component {
  handlePropertyDeleteClick = (propName) => {
    const { collectionName, updateDoc, document } = this.props;
    const newDoc = { ...document };
    newDoc[propName] = null;

    updateDoc(collectionName, newDoc);
  };

  render() {
    const {  document } = this.props;
    console.log(document);

    const properties = Object.keys(document)
      .filter((key) => key !== '_id')
      .map((key) => (
        <Property
          key={key}
          name={key}
          value={document[key]}
          editable={!blacklist.includes(key)}
          onDeleteClick={this.handlePropertyDeleteClick}
        />
      ));

    return (
      <li>{document._id}
        <ul className="doc">
          {properties}
          <li>
            <button>
              +
            </button>
          </li>
        </ul>
      </li>
    );
  }
};

const actionCreators = {
  updateDoc: collectionsActions.updateDocument,
};

export default connect(null, actionCreators)(Document);
