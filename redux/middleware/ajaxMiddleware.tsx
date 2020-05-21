// this is the client middleware, handles promisses to fetch data from API endpoints using Ajax.
const ajaxMiddleware = (client) => {
  // next as in next command action to handle in the middleware, which generates a new state for reducer to handle
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    // cannot fetch with AJAX on Server, use ClientAPI fetch directly
    if (SERVER) {
      return next(action);
    }

    const { ajaxPromise, types, ...rest } = action;
    const isTypesCountAccepted = types && (types.length === 3); // all ajax promises must have 3 types for this middleware
    if (!ajaxPromise || !isTypesCountAccepted) {
      return next(action);
    }

    // start promise request... change state using fetch status in redux store
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    let actionPromise = Promise.resolve();
    actionPromise = ajaxPromise(client);

    // continue on the promise request .... promise(client).then
    return actionPromise.then(
      result => next({
        ...rest, result, type: SUCCESS, receivedAt: Date.now(),
      }),
      error => next({ ...rest, error, type: FAILURE }),
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error); // eslint-disable-line no-console
      next({ ...rest, error, type: FAILURE });
    });
  };
}

export default ajaxMiddleware;
