import { collectionsConstants } from '../_constants';
import { wsActions, flashActions } from '../_actions';

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
    const { type, payload } = action;
    // eslint-disable-next-line default-case
    switch (type) {
      case 'WS_CONNECT':
        if (socket !== null) {
          socket.close(1000, 'page_change');
        }

        socket = createSocket(store, payload.host);

        break;
      case 'WS_CONNECTED':
        console.log(`Connected to ${socket.url}`);
        break;
      case 'WS_DISCONNECT':
        socket.close(1000, 'page_change');
        break;
      case 'WS_SEND':
        socket.send(JSON.stringify(payload));
        break;
      case 'WS_FAILURE':
        const errorMsg = `
          Collection: ${payload.model}
          Action: ${payload.data.action}
          Error: ${payload.data.message}
        `;

        store.dispatch(flashActions.error(errorMsg));
        break;
      case collectionsConstants.ADD_COLLECTION_SUCCESS:
        store.dispatch(flashActions.success('Created endpoints. Please create a new doc to save.'));
        break;
      case collectionsConstants.ADD_SUCCESS:
      case collectionsConstants.UPDATE_SUCCESS:
      case collectionsConstants.REPLACE_SUCCESS:
        store.dispatch(flashActions.success('Saved!'))
        break;
      case collectionsConstants.DELETE_SUCCESS:
        store.dispatch(flashActions.success('Deleted!'))
        break;
    }

    return next(action);
  }
};

export default createSocketMiddleware;
