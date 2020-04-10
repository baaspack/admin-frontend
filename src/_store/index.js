import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import createSocketMiddleware from './sockets';
import rootReducer from '../_reducers';

const socketMiddleware = createSocketMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk,
    socketMiddleware,
    // logger,
  ),
);

export default store;
