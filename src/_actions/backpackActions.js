import { backpackConstants } from '../_constants';
import { flashActions } from '.';
import apiClient from '../lib/apiClient';

import makeAction from './actionHelper';

const get = (backpackName) => {
  const request = () => makeAction(backpackConstants.GET_REQUEST);
  const success = (backpack) => makeAction(backpackConstants.GET_SUCCESS, { backpack });
  const failure = () => makeAction(backpackConstants.GET_FAILURE, {});

  return (dispatch) => {
    dispatch(request());

    return apiClient
      .send('GET', `backpacks/${backpackName}`)
      .then(({ message, backpack }) => {
        dispatch(success(backpack));
        dispatch(flashActions.success(message));
      })
      .catch((err) => {
        dispatch(failure());
        dispatch(flashActions.error(err.message));
        throw err.message;
      });
  }
};

export const backpackActions = {
  get,
};
