import React, { Component } from 'react';
import { connect } from 'react-redux';

import { collectionsActions } from '../../_actions';

import Document from './Document';

import styles from './collection.module.css';

class Collection extends Component {
  state = {
    showCollection: false,
  };

  componentDidMount() {
    const { get, name } = this.props;
    get(name);
  }

  toggleShowCollection = () => {
    this.setState((prevState) => {
      return {
        showCollection: !prevState.showCollection,
      }
    })
  }

  toggleCollectionDisplayLink = () => {
    const { showCollection } = this.state;
    const { documents } = this.props;

    if (documents.length) {
      if (showCollection) {
        return (
          <div>
            <button
              className="button-link"
              onClick={this.toggleShowCollection}
            >
              <small>[hide documents]</small>
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <button
              className="button-link"
              onClick={this.toggleShowCollection}
            >
              <small>[show documents]</small>
            </button>
          </div>
        );
      }
    }

    return null;
  }

  render() {
    const { showCollection } = this.state;
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
      <div className={styles.collection}>
        <h3 className={styles.header}>{name}</h3>
        <div className={styles.contentSection}>
          {this.toggleCollectionDisplayLink()}

          {
            showCollection && documentList.length ? (
              <ul>
                {showCollection && documentList}
              </ul>
            ) : null
          }

          <button
            className={styles.addDocument}
            type="button"
            onClick={() => onToggleShowModal(name)}
          >
            Add document
          </button>
        </div>
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
