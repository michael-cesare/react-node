import {
  loginEndpoint,
  tokenValidateEndpoint,
  tokenRenewEndpoint,
} from '../../common/endpoints';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_ACTION,
  AUTH_VALIDATE_REQUEST,
  AUTH_VALIDATE_SUCCESS,
  AUTH_VALIDATE_FAILURE,
  AUTH_TOKENS_REQUEST,
  AUTH_TOKENS_SUCCESS,
  AUTH_TOKENS_FAILURE,
} from '../types/userTypes';

export const login = (username: string, password: string): any => {
  return dispatch => dispatch({
    types: [
      typeof AUTH_LOGIN_REQUEST,
      typeof AUTH_LOGIN_SUCCESS,
      typeof AUTH_LOGIN_FAILURE,
    ],
    ajaxPromise: client => client.post(loginEndpoint, {
      data: {
        username,
        password,
      },
    }),
  });
}

export const validateToken = (token: string): any => {
  return dispatch => dispatch({
    types: [
      typeof AUTH_VALIDATE_REQUEST,
      typeof AUTH_VALIDATE_SUCCESS,
      typeof AUTH_VALIDATE_FAILURE,
    ],
    ajaxPromise: client => client.post(tokenValidateEndpoint, {
      params: {
        token,
      },
    }),
  });
}

export const logout = (): any => {
  return dispatch => dispatch({
    type: typeof AUTH_LOGOUT_ACTION,
    // no need to call server, clear local storage on reducer.
    /* promise: () => new Promise((resolve) => {
          resolve("");
      }), */
  });
}

export const refreshToken = (): any => {
  return dispatch => dispatch({
    types: [
      typeof AUTH_TOKENS_REQUEST,
      typeof AUTH_TOKENS_SUCCESS,
      typeof AUTH_TOKENS_FAILURE,
    ],
    ajaxPromise: client => client.post(tokenRenewEndpoint),
  });
}
