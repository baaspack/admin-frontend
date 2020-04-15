import { flashConstants } from '../_constants';

const success = (message) => {
  return { type: flashConstants.SUCCESS, message };
};

const error = (message) => {
  return { type: flashConstants.ERROR, message };
};

const clear = (message) => {
  return { type: flashConstants.CLEAR, message };
};

const persist = () => {
  return { type: flashConstants.PERSIST };
}

export const flashActions = {
  success,
  error,
  clear,
  persist,
};
