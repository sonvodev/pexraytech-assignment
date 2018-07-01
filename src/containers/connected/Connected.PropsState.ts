import { IMessageModel } from "../../models";

export interface IState {

}

export interface IProps {
  message?: IMessageModel;
  websocket?: WebSocket;
  disconnectSocket?: () => Promise<any>
}