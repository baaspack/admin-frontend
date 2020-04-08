import { collectionsConstants } from '../_constants';

/* Initialized State...
  {
    collectionName1: [doc1, doc2],
    collectionName2: [doc3, doc4]...
  }
*/
const initialState = {}

export const collectionsReducer = (state = initialState, { type, payload: { model, data } = {} }) => {
  switch (type) {
    case collectionsConstants.GET_ALL:
      const collections = data.reduce((obj, collectionName) => {
        obj[collectionName] = [];
        return obj;
      }, {});

      return { ...collections, ...state };
    case collectionsConstants.CLEAR_ALL:
      return {};
    case collectionsConstants.GET_SUCCESS:
      const { [model]: _, ...others } = state;

      return {
        ...others,
        [model]: data,
      }
    case collectionsConstants.UPDATE_SUCCESS:
      const updatedDoc = data;

      const collectionDocs = state[model].map((doc) => {
        return doc._id === updatedDoc._id ? updatedDoc : doc;
      });

      return {
        ...state,
        [model]: collectionDocs,
      };
    default:
      return state;
  }
};

export default collectionsReducer;
