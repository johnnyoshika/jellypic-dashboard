import React, { Component } from 'react';
import Card from '../../../components/Card';
import ErrorMessage from '../../../components/ErrorMessage';
import { selectPost } from '../../../utils/selectors';

import './Styles.css';

class PostView extends Component {
  componentDidMount() {
    this.props.fetchPost(parseInt(this.props.match.params.id, 10));
  }

  renderError() {
    return (
      <div className="text-center">
        <ErrorMessage message={this.props.post.error} />
      </div>
    );
  }

  renderSpinner() {
    return (
      <div className="text-center">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
      </div>
    );
  }

  renderPost() {
    return (
      <Card
        key={this.props.match.params.id}
        post={selectPost(this.props.entities, this.props.post.id)}
      />
    );
  }

  render() {
    return (
      <div className="post-container">
        <div className="gutter" />
        <div className="post-main">
          {(() => {
            switch (this.props.post.status) {
              case 'error':
                return this.renderError();
              case 'loading':
                return this.renderSpinner();
              case 'success':
                return this.renderPost();
              default:
                return null;
            }
          })()}
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default PostView;
