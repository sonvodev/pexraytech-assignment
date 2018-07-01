import { all, fork } from 'redux-saga/effects';
import {
  watchConnectWebsocket,
  watchDisconnectWebsocket,
  watchReceiveMessage
} from './websocket/websocket.sagas';

export function* rootSaga() {
  yield all([
    fork(watchConnectWebsocket),
    fork(watchDisconnectWebsocket),
    fork(watchReceiveMessage)
  ])
}