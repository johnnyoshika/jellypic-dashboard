import React, { Component, Fragment } from 'react';
import Refresher from '../../components/Refresher';
import ErrorMessage from '../../components/ErrorMessage';
import './Styles.css';

class View extends Component {
  componentDidMount() {
    this.props.checkFacebook();
  }

  componentDidUpdate(prevProps) {
    if (this.props.login.state === 'success') this.props.history.push('/');
  }

  disabled() {
    return (
      this.props.login.state === 'processing' ||
      this.props.login.state === 'success'
    );
  }

  render() {
    return (
      <Fragment>
        <Refresher />
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
              {this.props.login.state === 'error' && (
                <ErrorMessage message={this.props.login.error} />
              )}
            </div>
          </div>
          <div className="gutter" />
        </div>
      </Fragment>
    );
  }
}

export default View;
