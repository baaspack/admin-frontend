import { userConstants } from '../_constants';
import { flashActions } from './';
import apiClient from '../lib/apiClient';

import makeAction from './actionHelper';

const register = (email, password) => {
  const request = () => makeAction(userConstants.REGISTER_REQUEST, { email });
  const success = () => makeAction(userConstants.REGISTER_SUCCESS, { email });
  const failure = () => makeAction(userConstants.REGISTER_FAILURE, {});

  return (dispatch) => {
    dispatch(request());

    return apiClient
      .send('POST', 'register', { email, password })
      .then((res) => {
        dispatch(success());
        dispatch(flashActions.success(res.message));
      })
      .catch((err) => {
        dispatch(failure());
        dispatch(flashActions.error(err.message));
        throw err.message;
      });
  }
};

const login = (email, password) => {
  const request = () => makeAction(userConstants.LOGIN_REQUEST, { email });
  const success = () => makeAction(userConstants.LOGIN_SUCCESS, { email });
  const failure = () => makeAction(userConstants.LOGIN_FAILURE, {});

  return (dispatch) => {
    dispatch(request());

    return apiClient
      .send('POST', 'login', { email, password })
      .then((res) => {
        dispatch(success());
        dispatch(flashActions.success(res.message));
      })
      .catch((err) => {
        dispatch(failure());
        dispatch(flashActions.error(err.message));
        throw err.message;
      });
  }
};

const logout = () => {
  const request = () => makeAction(userConstants.LOGOUT_REQUEST);
  const success = () => makeAction(userConstants.LOGOUT_SUCCESS);
  const failure = () => makeAction(userConstants.LOGOUT_FAILURE);

  return (dispatch) => {
    dispatch(request());

    return apiClient
      .send('POST', 'logout')
      .then((res) => {
        dispatch(success());
        dispatch(flashActions.success(res.message));
      })
      .catch((err) => {
        dispatch(failure());
        dispatch(flashActions.error(err.message));
        throw(err);
      });
  }
};

const isLoggedIn = () => {
  const request = () => makeAction(userConstants.ISLOGGEDIN_REQUEST);
  const success = (isLoggedIn) => makeAction(userConstants.ISLOGGEDIN_SUCCESS, { isLoggedIn });
  const failure = () => makeAction(userConstants.ISLOGGEDIN_FAILURE);

  return (dispatch) => {
    dispatch(request());

    return apiClient
      .send('GET', 'isLoggedIn')
      .then((res) => {
        dispatch(success(res.isLoggedIn));
      })
      .catch((err) => {
        dispatch(failure());
        dispatch(flashActions.error(err.message));
      });
  }
};

export const userActions = {
  register,
  login,
  logout,
  isLoggedIn,
};
