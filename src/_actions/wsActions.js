import makeAction from './actionHelper';

const connect = (host) => {
  return makeAction('WS_CONNECT', { host });
};

const connected = () => {
  return makeAction('WS_CONNECTED');
};

const disconnect = () => {
  return makeAction('WS_DISCONNECT');
};

const send = (payload) => {
  return makeAction('WS_SEND', payload);
};

export const wsActions = {
  connect,
  connected,
  disconnect,
  send,
};
