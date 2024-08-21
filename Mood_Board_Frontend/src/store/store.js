import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './root-reducer';
import rootSaga from './root-sagas';

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
      { serializableCheck: false, immutableCheck: false }
    ).concat([
      logger,
      thunk,
      sagaMiddleware
    ])
  });

  sagaMiddleware.run(rootSaga);

  return store;
};
