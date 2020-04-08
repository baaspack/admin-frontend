import React, { Component } from 'react';
import { connect } from 'react-redux';

import { collectionsActions } from '../../_actions';
import Property from './Property';

const blacklist = ['_id', 'createdAt', 'updatedAt', '__v'];

class Document extends Component {
  state = {
    dangerHover: false,
  };

  handlePropertyDeleteClick = (propName) => {
    const { collectionName, updateDoc, document } = this.props;
    const newDoc = { ...document };
    newDoc[propName] = null;

    updateDoc(collectionName, newDoc);
  };

  handleDocumentDeleteClick = (e) => {
    e.stopPropagation();

    const { collectionName, deleteDoc, document: { _id },  } = this.props;

    deleteDoc(collectionName, _id);
  };

  handleDangerHover = () => {
    this.setState((prevState) => {
      return {
        dangerHover: !prevState.dangerHover,
      };
    });
  }

  render() {
    const { document, onDocClick, collectionName } = this.props;
    const { dangerHover } = this.state;

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
      <li
        className={`doc${dangerHover ? ' danger' : ''}`}
        onClick={() => onDocClick(collectionName, document)}
      >
        <div className="doc-header">
          <span>{document._id}</span>
          <button
            type="button"
            className="remove"
            onClick={this.handleDocumentDeleteClick}
            onMouseEnter={this.handleDangerHover}
            onMouseLeave={this.handleDangerHover}
          >
            &times;
          </button>
        </div>

        <ul className="properties">
          {properties}
        </ul>
      </li>
    );
  }
};

const actionCreators = {
  updateDoc: collectionsActions.updateDocument,
  deleteDoc: collectionsActions.deleteDocument,
};

export default connect(null, actionCreators)(Document);
