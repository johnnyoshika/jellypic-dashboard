import React, { Component } from 'react'
import './Styles.css'

class View extends Component {
  componentDidMount() {
    if (this.props.session.state !== 'authenticated')
      this.props.authenticate()
  }

  componentDidUpdate(prevProps) {
    if (this.props.session.state === 'anonymous')
      this.props.history.replace('/login')
  }

  render() {
    return (
      <div className="text-center">
        Session
      </div>
    )
  }
}

export default View