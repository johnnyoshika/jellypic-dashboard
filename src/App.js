import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Settings from './Settings';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
            <div>
              <Link to="/">Home</Link>
              |
              <Link to="/settings">Settings</Link>
            </div>
          </header>
          <div className="App-intro">
            <Route exact path="/" component={Home} />
            <Route path="/settings" component={Settings} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
