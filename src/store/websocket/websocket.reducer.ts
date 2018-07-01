import { WebsocketState, IWebsocketState } from './websocket.state';
import { ITypedAction } from '../../models';
import { WebsocketTypes } from './websocket.types'
import { WebsocketMutations } from './websocket.mutations';


const initialState = new WebsocketState({
  message: {},
  websocket: {},
  exception: null
})

const mutation = new WebsocketMutations;

export const websocketReducer =
  (state: IWebsocketState = initialState,
    action: ITypedAction): IWebsocketState => {
    switch (action.type) {

      case WebsocketTypes.RECEIVE_MESSAGE:
        return mutation.receiveMessage(state, action.payload);

      case WebsocketTypes.CONNECT_WEBSOCKET_SUCCESS:
        return mutation.receiveWebsocket(state, action.payload);

      case WebsocketTypes.DISCONNECT_WEBSOCKET_SUCCESS:
        return mutation.clearWebsocket(state);

      case WebsocketTypes.RECEIVE_EXCEPTION:
        return mutation.receiveException(state, action.error!);

      case WebsocketTypes.CLEAR_EXCEPTION:
        return mutation.receiveException(state, action.error!);

      default:
        return state;
    }
  }
