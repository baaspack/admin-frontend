import makeAction from './actionHelper';
import { websocketConstants } from '../_constants';

const connect = (host) => {
  return makeAction(websocketConstants.CONNECT, { host });
};

const connected = () => {
  return makeAction(websocketConstants.CONNECTED);
};

const disconnect = () => {
  return makeAction(websocketConstants.DISCONNECT);
};

const connectionLost = (reconnectionAttemptsRemaining) => {
  return makeAction(
    websocketConstants.CONNECTION_LOST,
    { attemptsRemaining: reconnectionAttemptsRemaining }
  );
}

const send = (payload) => {
  return makeAction(websocketConstants.SEND, payload);
};

export const wsActions = {
  connect,
  connected,
  disconnect,
  connectionLost,
  send,
};
