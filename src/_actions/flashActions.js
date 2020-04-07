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

export const flashActions = {
  success,
  error,
  clear,
};
