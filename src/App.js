import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Session from './routes/Session'
import Login from './routes/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Session} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
