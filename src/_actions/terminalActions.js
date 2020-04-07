import { terminalConstants } from '../_constants';
import makeAction from './actionHelper';

const changeFocus = (backpackName) => {
  return makeAction(terminalConstants.CHANGE_FOCUS, { backpackName });
};

const close = () => {
  return makeAction(terminalConstants.CLOSE);
};

const getMessage = (payload) => {
  return makeAction(terminalConstants.NEW_MESSAGE, payload);
};

export const terminalActions = {
  changeFocus,
  close,
  getMessage,
};
