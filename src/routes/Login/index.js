import React from 'react'
import './Styles.css'

export default () => (
  <div className="login-container">
    <div className="gutter" />
    <div className="login-main">
      <div className="font-lobster text-center mb-40">
        Jellypic
      </div>
      <div className="text-center">
        <button className="btn btn-primary btn-lg">Log in with Facebook</button>
      </div>
    </div>
    <div className="gutter" />
  </div>
)