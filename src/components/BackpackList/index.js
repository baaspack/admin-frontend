import React from 'react';

const BackpackList = ({ backpacks, onDeleteClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>API Key</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {backpacks.map((backpack) => (
          <tr key={backpack.id}>
            <td>{backpack.name}</td>
            <td>{backpack.api_key}</td>
            <td>
              <button
                type="button"
                onClick={() => onDeleteClick(backpack.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BackpackList;
