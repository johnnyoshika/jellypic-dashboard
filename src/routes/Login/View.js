import React, { Component } from 'react';
import WithError from '../../components/WithError';
import './Styles.css';

const Status = WithError(
  props => props.login.status === 'error'
);

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
            <Status message={this.props.login.error} {...this.props}>
              <button
                className="btn btn-primary btn-lg"
                disabled={this.disabled()}
                onClick={() => this.props.loginWithFacebook()}
              >
                Log in with Facebook
              </button>
            </Status>
          </div>
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default View;
