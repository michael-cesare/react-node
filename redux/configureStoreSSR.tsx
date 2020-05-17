import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// redux
import rootReducer from './reducers/index';

const configureStoreSSR = (ssrState) => {
  const middlewareList = [
    thunk,
  ];

  const enhancer = compose(applyMiddleware(...middlewareList));

  return createStore(
    rootReducer,
    ssrState,
    enhancer,
  );
};

export default configureStoreSSR;
