import React from 'react';
import { connect } from 'react-redux';
import { flashActions } from '../../_actions';

const FlashMessage = ({ flash, clearFlash }) => {
  const { type, message } = flash;

  if (!type) {
    return null;
  }

  return (
    <div className="flash-messages">
      <div className={type === 'error' ? 'flash error' : 'flash' }>
        <p className="flash-text">{message.toString()}</p>
        <button
          className="flash-remove"
          onClick={clearFlash}
        >
          &times;
        </button>
      </div>
    </div>
  )
};

const mapState = (state) => {
  const { flash } = state;

  return { flash };
}

const actionCreators = {
  clearFlash: flashActions.clear,
};

export default connect(mapState, actionCreators)(FlashMessage);
