import { collectionsConstants } from '../_constants';
import { wsActions } from '.';

import makeAction from './actionHelper';

const get = (collectionName) => {
  const request = () => makeAction(collectionsConstants.GET_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(wsActions.send({ action: 'get', model: collectionName }));
  }
};

const clearAll = () => {
  return makeAction(collectionsConstants.CLEAR_ALL);
};

export const collectionsActions = {
  get,
  clearAll,
};
