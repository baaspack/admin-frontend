import { backpacksConstants } from '../_constants';
import { flashActions, terminalActions } from '.';
import apiClient from '../lib/apiClient';

import makeAction from './actionHelper';

const getAll = () => {
  const request = () => makeAction(backpacksConstants.GETALL_REQUEST);
  const success = (backpacks) => makeAction(backpacksConstants.GETALL_SUCCESS, { backpacks });
  const failure = () => makeAction(backpacksConstants.GETALL_FAILURE, {});

  return (dispatch) => {
    dispatch(request());

    return apiClient
      .send('GET', 'backpacks')
      .then(({ message, backpacks }) => {
        dispatch(success(backpacks));

        if (message && message.length) {
          dispatch(flashActions.success(message));
        }
      })
      .catch((err) => {
        dispatch(failure());
        dispatch(flashActions.error(err.message));
        throw err.message;
      });
  }
};

const add = (backpackName, onFailure = (_msg) => {}) => {
  const request = () => makeAction(backpacksConstants.ADD_REQUEST);
  const success = (backpack) => makeAction(backpacksConstants.ADD_SUCCESS, { backpack });
  const failure = () => makeAction(backpacksConstants.ADD_FAILURE);

  return (dispatch) => {
    dispatch(request());

    return apiClient
    .send('POST', 'backpacks', { name: backpackName })
    .then(({ message, backpack }) => {
        dispatch(terminalActions.changeFocus(backpack.name));
        dispatch(success(backpack));
        dispatch(flashActions.success(message));

        return true;
      })
      .catch((err) => {
        dispatch(failure());
        onFailure(err.message);
        throw err.message;
      });
  }
};

const remove = (backpackId) => {
  const request = () => makeAction(backpacksConstants.DELETE_REQUEST);
  const success = (backpackId) => makeAction(backpacksConstants.DELETE_SUCCESS, { id: backpackId });
  const failure = () => makeAction(backpacksConstants.DELETE_FAILURE);

  return (dispatch) => {
    dispatch(request());

    return apiClient
    .send('DELETE', `backpacks/${backpackId}`)
    .then(({ message, id, name }) => {
        dispatch(terminalActions.changeFocus(name));
        dispatch(success(id));
        dispatch(flashActions.success(message));
      })
      .catch((err) => {
        dispatch(failure());
        dispatch(flashActions.error(err.message));
        throw err;
      });
  }
};

export const backpacksActions = {
  getAll,
  add,
  remove,
};
