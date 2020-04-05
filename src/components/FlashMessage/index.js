import React from 'react';

const FlashMessage = ({ flash, onFlashCloseClick }) => {
  if (!flash || !flash.message) {
    return null;
  }

  const { type, message } = flash;

  console.log(type, message);

  return (
    <div className="flash-messages">
      <div className={type === 'error' ? 'flash error' : 'flash' }>
        <p className="flash-text">{message.toString()}</p>
        <button
          className="flash-remove"
          onClick={onFlashCloseClick}
        >
          &times;
        </button>
      </div>
    </div>
  )
};

export default FlashMessage;
