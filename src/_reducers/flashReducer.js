import { flashConstants } from '../_constants';


const initialState = {
  type: null,
  msg: null,
};

export default (state = initialState, { type, message }) => {
  switch(type) {
    case flashConstants.SUCCESS:
      return { type: 'success', message };
    case flashConstants.ERROR:
      return { type: 'error', message };
    case flashConstants.CLEAR:
      return initialState;
    default:
      return state;
  }
};
