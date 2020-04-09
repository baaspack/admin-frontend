import { combineReducers } from 'redux';

import flash from './flashReducer';
import user from './userReducer';
import backpack from './backpackReducer';
import backpacks from './backpacksReducer';
import terminal from './terminalReducer';
import collections from './collectionsReducer';
import backpackUsers from './backpackUserReducer';


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
    name: '',
    collections: {
      name1: {
        docId1: doc1,
        docId2: doc2,
      },
      name2: {
        docId1: doc1,
        docId2: doc2,
      }
    }
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
})

export default rootReducer;
