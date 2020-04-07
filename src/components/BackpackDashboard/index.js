import React, { Component } from 'react';
import { connect } from 'react-redux';

import BackpackList from './BackpackList';
import BackpackAddFormToggle from './AddFormToggle';
import Terminal from '../Terminal';

import { wsActions } from '../../_actions'

class BackpackDashboard extends Component {
  componentDidMount() {
    const { connect } = this.props;

    connect('ws://localhost:3000');
  };

  render() {
    return (
      <div className="backpack-dashboard">
        <Terminal />
        <BackpackList />
        <BackpackAddFormToggle />
      </div>
    )
  }
};

const actionCreators = {
  connect: wsActions.connect,
  send: wsActions.send,
}

export default connect(null, actionCreators)(BackpackDashboard);
