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

const addDocument = (model, docData) => {
  const request = () => makeAction(collectionsConstants.ADD_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(flashActions.success('Adding new document...'));

    dispatch(wsActions.send({ action: 'post', model, data: docData }));
  }
};

const updateDocument = (model, docData) => {
  const request = () => makeAction(collectionsConstants.UPDATE_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(flashActions.success('Saving changes...'));

    dispatch(wsActions.send({ action: 'patch', model, data: docData }));
  }
};

const replaceDocument = (model, docData) => {
  const request = () => makeAction(collectionsConstants.REPLACE_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(flashActions.success('Saving changes...'));

    dispatch(wsActions.send({ action: 'put', model, data: docData }));
  }
};

const deleteDocument = (model, id) => {
  const request = () => makeAction(collectionsConstants.DELETE_REQUEST);

  return (dispatch) => {
    dispatch(request());
    dispatch(flashActions.success('Trying to delete..'));

    dispatch(wsActions.send({ action: 'delete', model, data: { id } }));
  }
};

export const collectionsActions = {
  get,
  clearAll,
  addDocument,
  updateDocument,
  replaceDocument,
  deleteDocument,
};
