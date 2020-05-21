import Immutable from 'immutable';

import { setUser, loadUser, unsetUser } from '../../util/AuthToken';

import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_ACTION,
  AUTH_VALIDATE_REQUEST,
  AUTH_VALIDATE_SUCCESS,
  AUTH_VALIDATE_FAILURE,
} from '../types/userTypes';

const ProfileState = Immutable.Map({
  token: null,
  name: null,
  email: null,
  id: null,
  group: null,
});

const AuthState = Immutable.Map({
  isAuthenticated: false,
  isFetching: false,
  isValidating: false,
  error: null,
});

const DefaultState = Immutable.Record({
  profile: ProfileState,
  auth: AuthState,
});

const initialState = new DefaultState();

export default function authReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH_LOGIN_REQUEST:
    return state.mergeIn(['auth'], { isFetching: true });
  case AUTH_LOGIN_SUCCESS: {
    const result = action.result;
    const token = result && result.token ? result.token : null;
    const user = result && result.user ? result.user : null;
    const profile = { token, ...user };
    const profileStr = JSON.stringify(profile);
    const userProfile = Immutable.fromJS(profile);
    setUser(profileStr); // persist in local storage

    const newState = state.mergeIn(['auth'], {
      isAuthenticated: true,
      isFetching: false,
      error: null,
    });

    return newState.mergeIn(['profile'], {
      profile: userProfile,
    });
  }
  case AUTH_LOGIN_FAILURE:
    state.mergeIn(['auth'], {
      isAuthenticated: false,
      isFetching: false,
      error: 'Server Error',
    });
  case AUTH_LOGOUT_ACTION: {
    unsetUser();

    const newState = state.mergeIn(['auth'], {
      isAuthenticated: false,
      isFetching: false,
      error: null,
    });

    return newState.mergeIn(['profile'], {
      profile: null,
    });
  }
  case AUTH_VALIDATE_REQUEST:
    return state.mergeIn(['auth'], {
      isValidating: true,
    });
  case AUTH_VALIDATE_SUCCESS: {
    // load from local storage.
    const profile = Immutable.fromJS(loadUser());
    const newState = state.mergeIn(['auth'], {
      isValidating: false,
      isAuthenticated: true,
    });

    return newState.mergeIn(['profile'], {
      profile,
    });
  }
  case AUTH_VALIDATE_FAILURE: {
    unsetUser(); // remove persist

    const newState = state.mergeIn(['auth'], {
      isValidating: false,
      isAuthenticated: false,
    });

    return newState.mergeIn(['profile'], {
      profile: null,
    });
  }
  default:
    return state;
  }
}
