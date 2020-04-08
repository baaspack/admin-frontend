import { collectionsConstants } from '../_constants';
import { wsActions, flashActions } from '.';

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

const updateDocument = (model, docData) => {
  const request = () => makeAction(collectionsConstants.UPDATE_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(flashActions.success('Saving changes...'));

    dispatch(wsActions.send({ action: 'patch', model, data: docData }));
  }
};

export const collectionsActions = {
  get,
  clearAll,
  updateDocument,
};
