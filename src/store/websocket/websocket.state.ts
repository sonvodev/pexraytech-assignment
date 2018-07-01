import { IRootState, RootState } from '../root.state';
import { IMessageModel, IException } from '../../models';

export interface IWebsocketState extends IRootState {
  message: IMessageModel
  websocket: WebSocket | any
  exception: IException | any
}

export class WebsocketState extends RootState implements IWebsocketState {
  message: IMessageModel
  websocket: WebSocket
  exception: IException | any
  /**
   *
   */
  constructor(opt: IWebsocketState) {
    super(opt)
  }
}