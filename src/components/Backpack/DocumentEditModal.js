import React, { Component } from 'react';
import { connect } from 'react-redux';

import { collectionsActions } from '../../_actions';


// TODO: find global way to track property blacklist
const blacklist = ['_id', 'createdAt', 'updatedAt', '__v'];

const replacer = (key, value) => {
  return blacklist.includes(key) ? undefined : value;
}

class DocumentEditModal extends Component {
  state = {
    error: '',
    document: '{\n\n}',
  };

  componentDidMount() {
    const { document } = this.props;

    if (document) {
      this.setState({
        document: JSON.stringify(document, replacer, 2),
      });
    }
  };

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      document: value,
    },
      () => this.parseJson(value)
    );
  };

  parseJson = (val) => {
    if (val.charAt(0) !== '{') {
      this.setState({
        error: 'Must be an object: {}'
      })

      return;
    }

    try {
      val === '' || JSON.parse(val);

      this.setState({
        error: '',
      });
    } catch (e) {
      const errorMessage = e.message.replace('JSON.parse: ', '');

      this.setState({
        error: errorMessage,
      });
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const document = JSON.parse(this.state.document);
    const { replaceDoc, addDoc, collection, onCloseClick } = this.props;
    const { _id, createdAt } = this.props.document || {};
    const actionToUse = _id ? replaceDoc : addDoc;

    const docToSend = {
      ...document,
      _id,
      createdAt,
    };

    actionToUse(collection, docToSend);
    onCloseClick();
  }

  render() {
    const { onCloseClick, collection } = this.props;
    const { error, document } = this.state;
    const isNew = !this.props.document;

    return (
      <div className="modal-background">
        <div className="modal">
          <div className="modal-header">
            <h1>{isNew ? 'Creating' : 'Editing'} {collection}</h1>
            <button className="modal-close" onClick={onCloseClick}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form
              action=""
              className="form"
              onSubmit={this.handleSubmit}
            >

              <small>Please enter a valid JSON representation of your document.</small>

              <textarea
                className="json-of-doc"
                name="json-doc"
                id="json-doc"
                cols="30"
                rows="10"
                value={document}
                onChange={this.handleChange}
                autoFocus
              >
              </textarea>

              <div className={`status${error ? ' error' : ' ok'}`}>
                {error ? error : (document && 'All good!')}
              </div>

              <button
                type="submit"
                disabled={!!error}
                className="modal submit"
              >
                {isNew ? 'Add' : 'Update'}
              </button>

            </form>
          </div>
        </div>
      </div>
    );
  }
};

const actionCreators = {
  replaceDoc: collectionsActions.replaceDocument,
  addDoc: collectionsActions.addDocument,
}

export default connect(null, actionCreators)(DocumentEditModal);
