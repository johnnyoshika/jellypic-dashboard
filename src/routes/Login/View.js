import React, { Component } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import './Styles.css';

class View extends Component {
  componentDidMount() {
    this.props.checkFacebook();
  }

  componentDidUpdate(prevProps) {
    if (this.props.login.status === 'success') this.props.history.push('/');
  }

  disabled() {
    return (
      this.props.login.status === 'processing' ||
      this.props.login.status === 'success'
    );
  }

  render() {
    return (
      <div className="login-container">
        <div className="gutter" />
        <div className="login-main">
          <div className="font-lobster text-center mb-40">Jellypic</div>
          <div className="text-center">
            <button
              className="btn btn-primary btn-lg"
              disabled={this.disabled()}
              onClick={() => this.props.loginWithFacebook()}
            >
              Log in with Facebook
            </button>
            {this.props.login.status === 'error' && (
              <ErrorMessage message={this.props.login.error} />
            )}
          </div>
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default View;
