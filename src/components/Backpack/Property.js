import React from 'react';

const Property = ({ name, value, editable, onDeleteClick }) => {
  return (
    <li>
      <div className="property">
        <span className="prop-name">{name}&nbsp;&nbsp;</span>
        <span className="prop-value">{value}</span>
        {editable &&
          <button
            type="button"
            className="remove"
            onClick={() => onDeleteClick(name)}
          >
            &times;
          </button>
        }
      </div>
    </li>
  );
};

export default Property;
