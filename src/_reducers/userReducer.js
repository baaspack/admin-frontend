import { userConstants } from '../_constants';

const initialState = {
  loading: true,
  isLoggedIn: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userConstants.ISLOGGEDIN_SUCCESS:
      return {
        loading: false,
        isLoggedIn: payload.isLoggedIn,
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        loading: false,
        isLoggedIn: true,
      }
    case userConstants.LOGOUT_SUCCESS:
      return {
        loading: false,
        isLoggedIn: false,
      }
    default:
      return state;
  }
}

export default userReducer;
