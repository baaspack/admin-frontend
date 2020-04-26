import React from 'react';
import { connect } from 'react-redux';
import { terminalActions } from '../../_actions';

import Modal from '../App/Modal';

const Terminal = ({ currentBackpackName, messages, close }) => {
  if (!currentBackpackName) {
    return null;
  }

  return (
    <Modal title='progress' onClose={close}>
      <div className="terminal">
        <pre>
          {messages[currentBackpackName]}
        </pre>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { currentBackpackName, messages } = state.terminal;

  return {
    currentBackpackName,
    messages,
  };
};

const actionCreators = {
  close: terminalActions.close,
}

export default connect(mapStateToProps, actionCreators)(Terminal);
