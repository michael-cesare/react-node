import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';

import user from './userReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  user,
});

export default rootReducer;