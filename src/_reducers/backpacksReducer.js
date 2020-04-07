import { backpacksConstants } from '../_constants';

const initialState = {
  backpacks: [],
};

export const backpacksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case backpacksConstants.GETALL_SUCCESS:
      return {
        ...state,
        backpacks: [...payload.backpacks],
      };
    case backpacksConstants.ADD_SUCCESS:
      const { backpack: newBackpack } = payload;

      const newBackpackList = [ ...state.backpacks, newBackpack ];

      return {
        ...state,
        backpacks: newBackpackList,
      };
    case backpacksConstants.DELETE_SUCCESS:
      const { id: deletedId } = payload;

      const remainingBackpacks = state.backpacks.filter(({ id }) => id !== deletedId);

      return {
        ...state,
        backpacks: remainingBackpacks,
      };
    default:
      return state;
  }
};

export default backpacksReducer;
