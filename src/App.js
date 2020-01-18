import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Session from './routes/Session';
import Login from './routes/Login';
import ReduxToastr from 'react-redux-toastr';
import Refresher from './components/Refresher';
import './Toastr.css';

const App = () => {
  return (
    <>
      <Refresher />
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
    </>
  );
};

export default App;
