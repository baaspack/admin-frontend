import React from 'react';

import styles from './user.module.css';

const User = ({ _id, email, onDeleteClick }) => {
  return (
    <tr>
      <td>{email}</td>
      <td className={styles.delete}>
        <div>
          <button
            type="button"
            onClick={() => onDeleteClick(_id)}
          >
            <span>delete</span>
          </button>
        </div>
      </td>
    </tr>
  )
};

export default User;
