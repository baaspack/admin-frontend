import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiClient from '../../lib/apiClient';
import { flashActions } from '../../_actions';

import styles from './host.module.css';

class AddZipForm extends Component {
  state = {
    selectedFile: null,
    displayInstructions: false
  };

  handleFileUpload = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { selectedFile } = this.state;
    const { backpackName, flashMsg, flashErr } = this.props;

    const formData = new FormData();
    formData.append('backpackName', backpackName);
    formData.append('file', selectedFile);

    apiClient
      .send('POST', `uploads/`, formData)
      .then(({ message }) => {
        flashMsg(message)
        this.setState({ displayInstructions: true });
      })
      .catch(({ message }) => {
        flashErr(`Error: ${message}`);
      })
  }

  render() {
    const hostname = window.location.host;
    const newHostname = hostname.replace('admin', this.props.backpackName);
    const instructionsUrl = `https://${newHostname}/`;

    return (
      <section>
        <h2 className={styles.header}>host</h2>

        <form
          action=""
          className={styles.form}
          onSubmit={this.handleSubmit}
        >
          <div className={styles.fileSection}>
            <label htmlFor="file">Upload a .zip of your frontend files: </label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".zip"
              onChange={this.handleFileUpload}
              required
            />
          </div>

          <button className={styles.submit} type="submit">upload & host</button>

          {
            this.state.displayInstructions &&
              <p className="upload-instructions">
                The uploaded content should be live at{' '}
                <a href={instructionsUrl}>{instructionsUrl}</a>{' '}
                in about 60 seconds.
              </p>
          }
        </form>
      </section>
    )
  }
};

const actionCreators = {
  flashMsg: flashActions.success,
  flashErr: flashActions.error,
}

export default connect(null, actionCreators)(AddZipForm);
