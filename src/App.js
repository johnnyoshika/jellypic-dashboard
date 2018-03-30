import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Session from './routes/Session';
import Login from './routes/Login';
import ReduxToastr from 'react-redux-toastr';
import './Toastr.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Session} />
          </Switch>
        </Router>
        <ReduxToastr
          timeOut={6000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar={false}
        />
      </React.Fragment>
    );
  }
}

export default App;
