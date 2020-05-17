import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux';


// checkout .......\DhaliaFE\util\reduxUtil.js
const rootReducer = combineReducers({
  routing: routerReducer,
});

export default rootReducer;
