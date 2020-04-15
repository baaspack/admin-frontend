import { combineReducers } from 'redux';

import flash from './flashReducer';
import user from './userReducer';
import backpack from './backpackReducer';
import backpacks from './backpacksReducer';
import terminal from './terminalReducer';
import collections from './collectionsReducer';
import backpackUsers from './backpackUserReducer';
import websocket from './websocketReducer';


/*
const state = {
  flash: {
    type: null,
    message: null,
  }
  user: {
    isLoading: true,
    isLoggedIn: false,
  },
  backpacks: {
    names: [],
  }
  terminal: {
    selectedBackpack: '',
    terminalMessages: {
      backpack1: [messages],
      backpack2: [otherMessages],
    }
  },
  backpack: {
    name: '' --selectedBackpack
  },
  collections: {
    collectionName1: [doc1, doc2],
    collectionName2: [doc3, doc4]...
  },
  users: {
    [user1, user2, user3]
  }
}
*/

const rootReducer = combineReducers({
  flash,
  user,
  backpacks,
  terminal,
  backpack,
  collections,
  backpackUsers,
  websocket,
})

export default rootReducer;
