import React from 'react';

const Terminal = ({ terminalMessages, onTerminalClick }) => {
  return (
    <div className="terminal">
        <button
          className="terminal-remove"
          onClick={onTerminalClick}
        >
          &times;
        </button>
      <pre>
        {terminalMessages}
      </pre>
    </div>
  );
};

export default Terminal;
