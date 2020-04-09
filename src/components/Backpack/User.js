import React from 'react';

const User = ({ _id, email, onDeleteClick }) => {
  return (
    <li className='user'>
      <span>{email}</span>

      {/* <button
        type="button"
        className="edit"
        // onClick={this.handleDeleteClick}
      >
        Edit
      </button> */}

      <button
        type="button"
        className="delete"
        onClick={() => onDeleteClick(_id)}
      >
        Delete
      </button>
    </li>
  )
};

export default User;
