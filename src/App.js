import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import Session from './routes/Session'
import Login from './routes/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header className="text-center">
            <Link to="/">Session</Link>
            |
            <Link to="/login">Login</Link>
          </header>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={Session} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
