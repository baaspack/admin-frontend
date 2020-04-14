import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import createSocketMiddleware from './sockets';
import rootReducer from '../_reducers';

const socketMiddleware = createSocketMiddleware();
const middleware = process.env.NODE_ENV === 'development'
  ? composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware,
      // logger,
    )
  )
  : applyMiddleware(
    thunk,
    socketMiddleware,
    // logger,
  )

const store = createStore(rootReducer, middleware);

export default store;
