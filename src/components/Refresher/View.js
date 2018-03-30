import React, { Component } from 'react';
import './Styles.css';

class View extends Component {
  constructor() {
    super();

    // REACT ES6 classes don't autobind, so bind it in the constructor
    // as suggested here: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
    this.reload = this.reload.bind(this);
  }

  componentDidMount() {
    this.props.setUp();
  }

  reload() {
    this.props.skipWaiting();
  }

  render() {
    return (() => {
      if (this.props.refresher.state !== 'fresh')
        return (
          <div className="refresher-container">
            <span>This site has updated!</span>
            <span>
              <button
                className="btn btn-primary"
                disabled={this.props.refresher.state === 'activating'}
                onClick={this.reload}
              >
                Reload
              </button>
            </span>
          </div>
        );
      else return null;
    })();
  }
}

export default View;
