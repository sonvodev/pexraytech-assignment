import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './root.reducer';
import { createLogger } from 'redux-logger';
import { rootSaga } from './root.sagas';

export default () => {
  const logger = createLogger()
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    reducers,
    applyMiddleware(logger, sagaMiddleware)
  )
  sagaMiddleware.run(rootSaga)
  return store
}

export { reducers };