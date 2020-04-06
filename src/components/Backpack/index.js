import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import apiClient from '../../lib/apiClient';

class Backpack extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    const { backpackName } = this.props.match.params;

    apiClient.send('GET', `backpacks/${backpackName}`)
      .then(({ backpack }) => {
        this.setState({
          name: backpack.name
        });

        this.ws = apiClient.getWebsocket(`/backpacks/${backpack.name}`);
      })
      .catch((err) => {
        this.setState({
          name: 'Nothing to see here!',
        });
      });

  };

  componentWillUnmount() {
    this.ws.close(1000, 'page_change');
  };

  render() {
    const { name } = this.state;

    return (
      <div className="backpack">
        <h1>{name || 'Loading...'}</h1>
      </div>
    );
  }
};

export default withRouter(Backpack);
