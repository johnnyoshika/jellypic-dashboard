import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import './Styles.css';

class View extends Component {
  constructor() {
    super();

    // REACT ES6 classes don't autobind, so bind it in the constructor
    // as suggested here: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
    this.subscribe = this.subscribe.bind(this);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this.checkSubscriberState(nextProps);
    this.reset();
  }

  checkSubscriberState(nextProps) {
    if (nextProps.subscriber.state === 'error')
      if (this.props.subscriber.error !== nextProps.subscriber.error)
        toastr.error(nextProps.subscriber.error);
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState({
      show: 'serviceWorker' in navigator && 'PushManager' in window,
      denied: Notification.permission === 'denied',
      subscribed: Notification.permission === 'granted'
    });
  }

  subscribe() {
    this.props.toggle();
  }

  render() {
    return (
      <div className="subscriber-state">
        <div className="gutter" />
        <div className="subscriber-state-content">
          {this.state.show && (
            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={this.subscribe}
                disabled={this.state.denied}
              >
                Get Notifications &nbsp;
                {this.state.denied && (
                  <i className="fa fa-times" aria-hidden="true" />
                )}
                {this.state.subscribed && (
                  <i className="fa fa-check" aria-hidden="true" />
                )}
                {!this.state.denied &&
                  !this.state.subscribed && (
                    <i className="fa fa-question" aria-hidden="true" />
                  )}
              </button>
            </div>
          )}
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default View;
