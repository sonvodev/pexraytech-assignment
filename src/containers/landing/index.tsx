import * as React from 'react';
import './Landing.css';
import { IState, IProps } from './Landing.PropsState';
import { FormControl, Button, Glyphicon } from 'react-bootstrap'
import { IRootReducer } from '../../store/root.reducer';
import { Dispatch, connect } from 'react-redux';
import { ITypedAction, IMessageModel } from '../../models';
import { websocketActions } from '../../store/websocket';
class LandingContainer extends React.Component<IProps, IState>{

  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      linkSocket: '' //Tested with "wss://echo.websocket.org"
    }
  }

  /**
   * Update value for linkSocket if input change something
   * @param target Input element
   */
  handleLinksocketChange(target: any) {
    this.setState({ linkSocket: target.value })
  }

  /**
   * Prevent some default event
   * Set link into store and init websocket in store
   * If websocket was  successfully initialized,  send message {"greeting": "hello"} to server and redicet to connected page then, 
   * Redirect to error page whenever exception has been occurred
   * @param event Button click event
   */
  handleConnect(event: any) {

    event.preventDefault();

    this.props.connectSocket(this.state!.linkSocket!)
      .then(({ websocket, message }) => {
        this.props.receiveMessage(websocket, message);//Store websocket and message variable into store
        setTimeout(() => (this.props as any).history.push('/connected'), 100);//Redirect to connected page after 100ms

      })
      .catch(error => (this.props as any).history.push('/error'));
  }

  render() {
    return (
      <div >
        <h1>Hello!</h1>
        <div className="row">
          <div className="col-md-5 col-xs-7"><FormControl placeholder="Type websocket link in here..."
            value={this.state!.linkSocket!} onChange={(event) => this.handleLinksocketChange(event.target)} /></div>
          <div className="col-md-1 col-xs-1">
            <Button className='btn btn-default' onClick={this.handleConnect.bind(this)}>
              <Glyphicon glyph='log-in' />
              {' '}Connect</Button>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (rootReducer: IRootReducer) => ({ ...rootReducer.websocketReducer });
const mapDispatchToProps = (dispatch: Dispatch<ITypedAction>) => ({

  connectSocket: (link: string) => new Promise(
    (resolve, reject) => dispatch(websocketActions.connect(link, resolve, reject))
  )
  , receiveMessage: (websocket: WebSocket, message: IMessageModel) => new Promise(
    (resolve, reject) => dispatch(websocketActions.receiveMessage(websocket, message))
  )
})

export default connect<any, any, IProps>(
  mapStateToProps,
  mapDispatchToProps
)(LandingContainer);