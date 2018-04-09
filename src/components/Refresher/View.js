import React, { Component } from 'react';
import './Styles.css';

class View extends Component {
  componentDidMount() {
    this.props.setUp();
  }

  reload = () => {
    this.props.skipWaiting();
  };

  render() {
    return (() => {
      if (this.props.refresher.status !== 'fresh')
        return (
          <div className="refresher-container">
            <span>This site has updated!</span>
            <span>
              <button
                className="btn btn-primary"
                disabled={this.props.refresher.status === 'activating'}
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
