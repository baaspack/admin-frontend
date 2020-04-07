import { backpackConstants } from '../_constants';

const initialState = {
  name: ''
};

export const backpackReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case backpackConstants.GET_SUCCESS:
      return {
        name: payload.backpack.name,
      };
    default:
      return state;
  }
};

export default backpackReducer;
