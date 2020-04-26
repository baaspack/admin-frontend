import { terminalConstants } from '../_constants/';

const initialState = {
  currentBackpackName: '',
  messages: {},
};

export const terminalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case terminalConstants.CHANGE_FOCUS:
      return {
        ...state,
        currentBackpackName: payload.backpackName,
      }
    case terminalConstants.CLOSE:
      return {
        ...state,
        currentBackpackName: '',
        messages: {},
      }
    case terminalConstants.RECEIVE_MESSAGE:
      const { backpackName, message } = payload;
      const { [backpackName]: bpMessages, ...others } = state.messages;

      const newMessages = bpMessages ? [...bpMessages, message] : [message];

      return {
        ...state,
        messages: {
          ...others,
          [backpackName]: newMessages,
        }
      }
    default:
      return state;
  }
}

export default terminalReducer;
