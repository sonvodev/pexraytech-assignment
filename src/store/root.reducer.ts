import { combineReducers, Reducer } from 'redux';
import { websocketReducer, IWebsocketState } from './websocket'
import { ITypedAction } from '../models';
export interface IRootReducer {
  websocketReducer: Reducer<IWebsocketState, ITypedAction>
}

const rootReducer = combineReducers(<IRootReducer>{
  websocketReducer
});

export default rootReducer;