import { backpackUserConstants } from '../_constants';
import { wsActions, flashActions } from '.';

import makeAction from './actionHelper';

const get = () => {
  const request = () => makeAction(backpackUserConstants.GET_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(wsActions.send({ action: 'get', model: 'users' }));
  }
};

const clearAll = () => {
  return makeAction(backpackUserConstants.CLEAR_ALL);
};

const addUser = (email, password) => {
  const request = () => makeAction(backpackUserConstants.ADD_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(flashActions.success('Adding user...'));

    dispatch(wsActions.send({ action: 'post', model: 'users', data: { email, password } }));
  }
};

// const updateUser = (userData) => {
//   const request = () => makeAction(backpackUserConstants.UPDATE_REQUEST);

//   return (dispatch) => {
//     dispatch(request());
//     dispatch(flashActions.success('Saving changes...'));

//     dispatch(wsActions.send({ action: 'patch', model: 'users', data: userData }));
//   }
// };

const deleteUser = (id) => {
  const request = () => makeAction(backpackUserConstants.DELETE_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(flashActions.success('Trying to delete..'));

    dispatch(wsActions.send({ action: 'delete', model: 'users', data: { id } }));
  }
};

export const backpackUserActions = {
  get,
  clearAll,
  addUser,
  // updateUser,
  deleteUser,
};
