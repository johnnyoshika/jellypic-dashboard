import React, { Component } from 'react';
import './Styles.css';

class View extends Component {
  componentDidMount() {
    this.props.check();
  }

  renderSubscribed() {
    return (
      <div className="subscriber-state-alert subscriber-state-alert-green mb-40">
        You are subscribed to push notifications!{' '}
        <i className="fa fa-check" aria-hidden="true" />
        <br />
        <br />
        <button className="btn btn-primary" onClick={this.props.unsubscribe}>
          Unsubscribe
        </button>
      </div>
    );
  }

  renderAvailable() {
    return (
      <div className="subscriber-state-alert subscriber-state-alert-blue mb-40">
        Your device supports push notifications. Subscribe now!{' '}
        <i className="fa fa-smile" aria-hidden="true" />
        <br />
        <br />
        <button className="btn btn-primary" onClick={this.props.subscribe}>
          Subscribe
        </button>
      </div>
    );
  }

  renderUnavailable() {
    return (
      <div className="subscriber-state-alert subscriber-state-alert-yellow mb-40">
        Unfortunately your device doesn't support push notifications yet.{' '}
        <i className="fa fa-frown" aria-hidden="true" />
      </div>
    );
  }

  renderLoading() {
    return (
      <div className="text-center">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
      </div>
    );
  }

  renderError() {
    return (
      <div className="subscriber-state-alert subscriber-state-alert-red mb-40">
        {this.props.subscriber.error}
        <br />
        <br />
        <button className="btn btn-primary" onClick={this.props.check}>
          Check again
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="subscriber-state">
        <div className="gutter" />
        <div className="subscriber-state-content">
          <div className="text-center">
            {(() => {
              switch (this.props.subscriber.status) {
                case 'subscribed':
                  return this.renderSubscribed();
                case 'available':
                  return this.renderAvailable();
                case 'unavailable':
                  return this.renderUnavailable();
                case 'checking':
                case 'saving':
                  return this.renderLoading();
                case 'error':
                  return this.renderError();
                default:
                  return null;
              }
            })()}
          </div>
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default View;
