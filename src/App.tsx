import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppHeader from './components/app-header';
import LandingContainer from './containers/landing';
import ConnectedContainer from './containers/connected';
import ExceptionContainer from './containers/exception';

class App extends React.Component {
  public render() {
    return (
      <div>
        <AppHeader />
        <div className="container">
          <Switch >
            <Route exact path='/' component={LandingContainer} />
            <Route path='/connected' component={ConnectedContainer} />
            <Route path='/error' component={ExceptionContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
