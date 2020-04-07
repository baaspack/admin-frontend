import React from 'react';

import Property from './Property';

const blacklist = ['_id', 'createdAt', 'updatedAt', '__v'];

const Document = ({ document }) => {
  const properties = Object.keys(document)
    .filter((key) => key !== '_id')
    .map((key) => (
      <Property
        key={key}
        name={key}
        value={document[key]}
        editable={!blacklist.includes(key)}
      />
    ));

  return (
    <li>{document._id}
      <ul className="doc">
        {properties}
        <li>
          <button>
            +
          </button>
        </li>
      </ul>
    </li>
  );
};

export default Document;
