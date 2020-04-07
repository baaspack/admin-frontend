import React from 'react';

import Property from './Property';

const blacklist = ['_id', 'createdAt', 'updatedAt', '__v'];

const Document = ({ document }) => {
  console.log(document);
  const properties = Object.keys(document)
    .filter((key) => key !== '_id')
    .map((key) => (
      <Property key={key}
        name={key}
        value={document[key]}
        editable={!blacklist.includes(key)}
      />
    ));

  return (
    <li>{document._id}
      <ul>
        {properties}
      </ul>
    </li>
  );
};

export default Document;
