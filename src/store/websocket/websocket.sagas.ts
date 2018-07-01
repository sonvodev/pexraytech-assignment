import { ITypedAction, IMessageModel } from '../../models';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { websocketActions } from './websocket.actions'
import { ActivityStatus } from '../../common/enums/activity.enum';
import { WebsocketTypes } from 'src/store/websocket/websocket.types';



export function* connectWebsocket(action: ITypedAction) {
  try {
    yield put(websocketActions.loadingActivity(
      ActivityStatus.Loading,
      WebsocketTypes.ACTIVITY_SOCKET_LOADING
    ))
    const websocket = new WebSocket(action.payload);
    websocket.onopen = () => {
      websocket.send(JSON.stringify(<IMessageModel>{ greeting: 'hello' }));//Send message to socket
    }
    websocket.onmessage = (event) => {
      action.meta.resolve({ websocket, message: JSON.parse(event.data) });//Return message as a promise
    }

  } catch (ex) {
    yield put(websocketActions.receiveException(ex));
    yield action.meta.reject(ex);

  }
}
export function* receiveMessage(action: ITypedAction) {
  try {
    yield put(websocketActions.receiveMessageSuccess(action.payload))
  } catch (ex) {
    yield put(websocketActions.receiveException(ex));
    yield action.meta.reject(ex);
  }
}
export function* disconnectWebsocket(action: ITypedAction) {
  try {
    yield put(websocketActions.disconnectSuccess())
    yield action.meta.resolve(true);
  } catch (ex) {
    yield put(websocketActions.receiveException(ex));
    yield action.meta.reject(ex);
  }
}

export function* watchConnectWebsocket() {
  yield takeLatest(WebsocketTypes.CONNECT_WEBSOCKET, connectWebsocket)
}

export function* watchDisconnectWebsocket() {
  yield takeEvery(WebsocketTypes.DISCONNECT_WEBSOCKET, disconnectWebsocket)
}
export function* watchReceiveMessage() {
  yield takeEvery(WebsocketTypes.RECEIVE_MESSAGE, receiveMessage)
}
