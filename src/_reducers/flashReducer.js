import { flashConstants } from '../_constants';

const initialState = {
  type: null,
  msg: null,
  persist: false,
};

export default (state = initialState, { type, message }) => {
  switch(type) {
    case flashConstants.SUCCESS:
      // We want to make sure a "persist" that is in the state doesn't get kept
      // around for the new message.
      return { type: 'success', persist: false, message };
    case flashConstants.ERROR:
      // We want to make sure a "persist" that is in the state doesn't get kept
      // around for the new message.
      return { type: 'error', persist: false, message };
    case flashConstants.CLEAR:
      if (state.persist) {
        return { ...state, persist: false };
      } else {
        return initialState;
      }
    case flashConstants.PERSIST:
      // Persistance is used for setting flash and then navigating to a new URL.
      // Flash is usually cleared when navigating, so persisting allows us to
      // cause the life of a flash message to extend through one extra "clear"
      // command.
      return { ...state, persist: true };
    default:
      return state;
  }
};
