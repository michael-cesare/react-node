
import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import ajaxMiddleware from './middleware/ajaxMiddleware';
// redux
import rootReducer from './reducers/index';
// import { APP_ENV } from '../typings';

const reHydrateStore = () => {
  const nodeSSRState = window && (window as any).__INITIAL_STATE__ || {};
  // 1. Start by server data
  const initialState = Immutable.fromJS(nodeSSRState);

  return initialState;
};

const stateTransformer = (state: any) => {
  const newState = state && state.toJS ? state.toJS() : state;

  return newState;
};

const configureStore = (client: any, history: any) => {
  // the order is very important.
  const middlewareList: any = [
    thunk,
    ajaxMiddleware(client),
    routerMiddleware(history),
  ];

  // logger must be the last middleware.
  let useDevTools = false;
  if (APP_ENV && APP_ENV === 'development') {
    const loggerMiddleware = createLogger({
      level: 'log',
      stateTransformer,
    });

    middlewareList.push(loggerMiddleware);
  }

  let enhancer;
  if (useDevTools) {
    enhancer = composeWithDevTools(applyMiddleware(...middlewareList));
  } else {
    enhancer = compose(applyMiddleware(...middlewareList));
  }

  const persistedState = reHydrateStore();

  return createStore(
    rootReducer,
    persistedState,
    enhancer,
  );
};

export default configureStore;
