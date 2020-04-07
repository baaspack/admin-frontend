import { wsActions } from '../_actions';

let retriesRemaining = 5;
const msToWaitBeforeRetry = 5000;

const createSocket = (store, url) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    retriesRemaining = 5;

    socket.onmessage = (e) => {
      const { type, payload } = JSON.parse(e.data);

      store.dispatch({ type, payload });
    };

    store.dispatch(wsActions.connected());
  }

  socket.onclose = (e) => {
    if (e.reason === 'page_change') {
      return;
    }

    if (retriesRemaining > 0) {
      retriesRemaining -= 1;
      console.log('WS Connection closed, trying to reconnect');
      setTimeout(() => { createSocket(store, url); }, msToWaitBeforeRetry);
    } else {
      console.log(`Couldn't reconnect to ${socket.url}`);
    }
  }

  return socket;
}

const createSocketMiddleware = () => {
  let socket = null;

  return (store) => (next) => (action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close(1000, 'page_change');
        }

        socket = createSocket(store, action.payload.host);

        break;
      case 'WS_CONNECTED':
        console.log(`Connected to ${socket.url}`);
        break;
      case 'WS_DISCONNECT':
        socket.close(1000, 'page_change');
        break;
      case 'WS_SEND':
        console.log(action.payload);
        socket.send(JSON.stringify(action.payload));
        break;
    }

    return next(action);
  }
};

export default createSocketMiddleware;
