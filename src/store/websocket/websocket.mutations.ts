import { IWebsocketState } from ".";
import { IException, IMessageModel } from "../../models";
import { ActivityStatus } from "../../common/enums/activity.enum";

export class WebsocketMutations {

  receiveMessage(state: IWebsocketState,
    payload: { websocket: WebSocket, message: IMessageModel }): IWebsocketState {
    return Object.assign({}, state, {
      websocket: payload.websocket,
      message: payload.message
    });
  }

  receiveLinksocket(state: IWebsocketState,
    link: string): IWebsocketState {
    return Object.assign({}, state, {
      linkSocket: link
    });
  }


  receiveWebsocket(state: IWebsocketState,
    websocket: WebSocket): IWebsocketState {
    return Object.assign({}, state, {
      websocket,
      activityStatus: ActivityStatus.Loaded
    });
  }

  receiveException(state: IWebsocketState,
    error: IException): IWebsocketState {
    return Object.assign({}, state, {
      exception: error,
      activityStatus: ActivityStatus.LoadingFailed
    })
  }

  clearException(state: IWebsocketState): IWebsocketState {
    return Object.assign({},
      state,
      { exception: null })
  }

  clearWebsocket(state: IWebsocketState): IWebsocketState {
    return Object.assign({},
      state,
      {
        activityStatus: ActivityStatus.NoActivity,
        websocket: {},
        message: {}
      })
  }

}