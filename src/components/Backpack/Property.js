import React from 'react';

const Property = ({ name, value }) => {
  return (
    <li>
      <div className="property">
        <span className="prop-name">{name}&nbsp;&nbsp;</span>
        <span className="prop-value">{value}</span>
        <button
          type="button"
          className="remove"
        >
          &times;
        </button>
      </div>
    </li>
  );
};

export default Property;
