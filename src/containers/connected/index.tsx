import * as React from 'react';
import './Connected.css';
import { IState, IProps } from './Connected.PropsState';
import { Button, Glyphicon, Clearfix } from 'react-bootstrap'
import { connect, Dispatch } from 'react-redux';
import { IRootReducer } from '../../store/root.reducer';
import { websocketActions } from '../../store/websocket';
import { ITypedAction } from '../../models';

class ConnectedContainer extends React.Component<IProps, IState>{

  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  /**
   * Handle disconnect socket from link
   * Release 2 variables in store: websocket & message
   * Redirect to home after socket is disconnected
   * If has any exception occurs, redirect to erro page
   */
  handleDisconnect() {
    if (this.props.websocket) {

      this.props.websocket.onclose = (e) => {
        this.props.disconnectSocket!()
          .then((result: boolean) => {
            (this.props as any).history.push('/');
          })
          .catch(error => (this.props as any).history.push('/error'));
      }
      this.props.websocket.close();
    }
    else {
      (this.props as any).history.push('/');
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-11 col-xs-9">
            <h5>Response:</h5>
          </div>
          <div className="col-md-1 col-xs-1">
            <Button className='btn btn-default' onClick={this.handleDisconnect.bind(this)}>
              <Glyphicon glyph='log-out' />
              {' '}Disconnect</Button>
          </div>
        </div>
        <Clearfix />
        <div className="alert alert-info">
          {this.props.message && this.props.message!.greeting}
        </div>
      </div>

    )
  }

}
const mapStateToProps = (rootReducer: IRootReducer) => ({ ...rootReducer.websocketReducer });
const mapDispatchToProps = (dispatch: Dispatch<ITypedAction>) => ({
  disconnectSocket: (websocket: WebSocket) => new Promise(
    (resolve, reject) => dispatch(websocketActions.disconnect(resolve, reject))
  )
})

export default connect<any, any, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedContainer);