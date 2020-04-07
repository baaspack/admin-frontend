import { collectionsConstants } from '../_constants';

const initialState = {}

export const collectionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case collectionsConstants.GET_ALL:
      const collections = payload.data.reduce((obj, collectionName) => {
        obj[collectionName] = {};
        return obj;
      }, {});

      return collections;
    case collectionsConstants.GET:
      const { [payload.model]: _, ...others } = state;

      const documents = payload.data.reduce((obj, document) => {
        obj[document._id] = document;
        return obj;
      }, {});

      console.log(payload.data, documents);

      return {
        ...others,
        [payload.model]: documents,
      }
    default:
      return state;
  }
};

export default collectionsReducer;
