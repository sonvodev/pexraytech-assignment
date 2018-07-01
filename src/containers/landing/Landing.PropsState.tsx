import { IMessageModel } from '../../models';

export interface IState {
  linkSocket: string | null;
}

export interface IProps {
  connectSocket(linkSocket: string): Promise<any>;
  receiveMessage: (websocket: WebSocket, message: IMessageModel) => void;
}