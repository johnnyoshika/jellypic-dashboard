import React, { Component } from 'react';
import Card from '../../../components/Card';
import WithStatus from '../../../components/WithStatus';
import { selectPost } from '../../../utils/selectors';
import './Styles.css';

const getPost = props => selectPost(props.entities, props.post.id);

const Status = WithStatus(
  props => props.post.status === 'error' && !getPost(props),
  props => props.post.status === 'loading' && !getPost(props)
);

class PostView extends Component {
  componentDidMount() {
    this.props.fetchPost(parseInt(this.props.match.params.id, 10));
  }

  renderPost() {
    return <Card key={this.props.match.params.id} post={getPost(this.props)} />;
  }

  render() {
    return (
      <div className="post-container">
        <div className="gutter" />
        <div className="post-main">
          <Status
            message={this.props.post.error}
            {...this.props}
          >
            {getPost(this.props) && this.renderPost()}
          </Status>
        </div>
        <div className="gutter" />
      </div>
    );
  }
}

export default PostView;
