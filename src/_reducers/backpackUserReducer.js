import { backpackUserConstants } from '../_constants';

const initialState = [];

export const backpackReducer = (state = initialState, { type, payload: { data } = {} }) => {
  const userId = data && ( data._id || data.id );

  switch (type) {
    case backpackUserConstants.GET_SUCCESS:
      return data;
    case backpackUserConstants.CLEAR_ALL:
      return [];
    case backpackUserConstants.ADD_SUCCESS:
      return [...state, data.user];
    case backpackUserConstants.UPDATE_SUCCESS:
      const updatedUser = data;

      return state.map((user) => user._id === userId ? updatedUser : user);
    case backpackUserConstants.DELETE_SUCCESS:
      return state.filter((user) => user._id !== userId);
    default:
      return state;
  }
};

export default backpackReducer;
