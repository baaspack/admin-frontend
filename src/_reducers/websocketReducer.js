import { websocketConstants } from '../_constants';

const initialState = {
  status: websocketConstants.DISCONNECTED_STATUS,
  host: null,
};

export const backpackReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case websocketConstants.CONNECT:
      return {
        ...state,
        status: websocketConstants.CONNECTING_STATUS,
        host: payload.host,
      };
    case websocketConstants.CONNECTED:
      return {
        ...state,
        status: websocketConstants.CONNECTED_STATUS,
      }
    case websocketConstants.DISCONNECT:
      return initialState;
    case websocketConstants.CONNECTION_LOST:
      if (payload.attemptsRemaining === 0) {
        return {
          ...state,
          status: websocketConstants.CONNECTION_LOST_STATUS,
        };
      } else if (state.status === websocketConstants.CONNECTED_STATUS) {
        // we were previously connected, this is a true disconnection
        return {
          ...state,
          status: websocketConstants.RECONNECTING_STATUS,
        }
      } else {
        // we were not previously connected, this is likely just a failed
        // connection attempt
        return state;
      }
    default:
      return state;
  }
};

export default backpackReducer;
