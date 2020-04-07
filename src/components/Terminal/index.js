import React from 'react';
import { connect } from 'react-redux';
import { terminalActions } from '../../_actions';

const Terminal = ({ currentBackpackName, messages, close }) => {
  if (!currentBackpackName) {
    return null;
  }

  return (
    <div className="terminal">
        <button
          className="terminal-remove"
          onClick={close}
        >
          &times;
        </button>
      <pre>
        {messages[currentBackpackName]}
      </pre>
    </div>
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
