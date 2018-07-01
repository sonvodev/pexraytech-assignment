import * as React from 'react';
import './Exception.css';
import { IState, IProps } from './Exception.PropsState';
import { connect, Dispatch } from 'react-redux';
import { IRootReducer } from '../../store/root.reducer';
import { ITypedAction } from '../../models';
import { websocketActions } from '../../store/websocket';
import { Button, Glyphicon } from 'react-bootstrap'
class ExceptionContainer extends React.Component<IProps, IState>{

  /**
   *
   */
  constructor(props: Readonly<IProps>) {
    super(props);
  }

  componentDidMount() {
    if (this.props.exception === undefined) {
      (this.props as any).history.goBack()
    }
  }

  /**
   * Handle goBack, redirect to previous page
   * Not implemented yet because currently using error default page
   */
  handleBack() {
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleBack.bind(this)}>
          <Glyphicon glyph='menu-left' />
          {' '}
          Back
        </Button>
        <div className='alert alert-danger'>{
          this.props.exception && this.props.exception
        }</div>
      </div>
    )
  }

}

const mapStateToProps = (rootReducer: IRootReducer) => ({ ...rootReducer.websocketReducer });
const mapDispatchToProps = (dispatch: Dispatch<ITypedAction>) => ({
  clearException: () => new Promise(
    (resolve, reject) => dispatch(websocketActions.clearException(resolve, reject))
  )
})

export default connect<any, any, IProps>(mapStateToProps, mapDispatchToProps)(ExceptionContainer);