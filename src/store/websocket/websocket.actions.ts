import { IRootAction, RootAction } from '../root.actions';
import {
  ITypedAction
  , IMessageModel,
  IException
} from '../../models';
import { WebsocketTypes } from '.';

export interface IWebsocketActions extends IRootAction {
  connect(link: string, resolve: any, reject: any): ITypedAction<string>;
  connectSuccess(websocket: WebSocket): ITypedAction<WebSocket>;
  disconnect(resolve: any, reject: any): ITypedAction;
  disconnectSuccess(): ITypedAction;
  receiveMessage(websocket: WebSocket, message: IMessageModel): ITypedAction;
  receiveMessageSuccess(payload: IMessageModel): ITypedAction<IMessageModel>;
  receiveException(error: IException): ITypedAction;
  clearException(resolve: any, reject: any): ITypedAction;
}

export class WebsocketActions extends RootAction implements IWebsocketActions {

  connect(link: string, resolve: any, reject: any): ITypedAction<string> {
    return {
      type: WebsocketTypes.CONNECT_WEBSOCKET,
      payload: link,
      meta: { resolve, reject }
    }
  }

  connectSuccess(websocket: WebSocket): ITypedAction<WebSocket> {
    return {
      type: WebsocketTypes.CONNECT_WEBSOCKET_SUCCESS,
      payload: websocket
    }
  }

  disconnect(resolve: any, reject: any): ITypedAction {
    return {
      type: WebsocketTypes.DISCONNECT_WEBSOCKET,
      meta: { resolve, reject }
    }
  }

  disconnectSuccess(): ITypedAction {
    return { type: WebsocketTypes.DISCONNECT_WEBSOCKET_SUCCESS }
  }

  receiveMessage(websocket: WebSocket, message: IMessageModel): ITypedAction {
    return {
      type: WebsocketTypes.RECEIVE_MESSAGE,
      payload: { websocket, message }
    }
  }
  receiveMessageSuccess(payload: IMessageModel): ITypedAction {
    return {
      type: WebsocketTypes.RECEIVE_MESSAGE_SUCCESS,
      payload
    }
  }

  receiveException(error: IException) {
    return {
      type: WebsocketTypes.RECEIVE_EXCEPTION,
      error
    }
  }

  clearException(resolve: any, reject: any): ITypedAction {
    return { type: WebsocketTypes.RECEIVE_EXCEPTION }
  }
}

export const websocketActions = new WebsocketActions;