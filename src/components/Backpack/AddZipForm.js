import React, { Component } from 'react';
import { connect } from 'react-redux';

import apiClient from '../../lib/apiClient';
import { flashActions } from '../../_actions';


class AddZipForm extends Component {
  state = {
    selectedFile: null,
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
      })
      .catch(({ message }) => {
        flashErr(`Error: ${message}`);
      })
  }

  render() {
    return (
      <form
        action=""
        className="zip-upload-form"
        onSubmit={this.handleSubmit}
      >
        <div>
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

        <button type="submit">Upload & Host!</button>
      </form>
    )
  }
};

const actionCreators = {
  flashMsg: flashActions.success,
  flashErr: flashActions.error,
}

export default connect(null, actionCreators)(AddZipForm);
