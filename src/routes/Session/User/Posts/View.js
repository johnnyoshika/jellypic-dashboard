import React, { Component } from 'react';
import WithInfiniteScroll from '../../../../components/WithInfiniteScroll';
import { selectPost } from '../../../../utils/selectors';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

const InfiniteScroll = WithInfiniteScroll(
  props => props.userPosts.posts.length && props.userPosts.nextUrl,
  props => props.userPosts.posts.length ? props.fetchNext(props.userPosts.id) : props.fetchLatest(props.id),
  props => props.userPosts.status === 'error',
  props => props.userPosts.status === 'loading'
);

class PostsView extends Component {
  componentDidMount() {
    this.props.fetchLatest(this.props.id);
  }

  // had to put this here b/c when router goes from /users/1 to /user/2, new component doesn't get mounted.
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.fetchLatest(nextProps.id);
    }
  }

  renderPost(id) {
    const post = selectPost(this.props.entities, id);
    return (
      <div key={post.id} className="profile-photo">
        <Link to={'/posts/' + post.id}>
          <Image
            className="image-100"
            crossOrigin="anonymous"
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={post.cloudinaryPublicId}
            crop="fill"
            height="293"
            width="293"
            gravity="auto:faces"
            secure
          />
        </Link>
      </div>
    );
  }

  render() {
    return (
      <InfiniteScroll message={this.props.userPosts.error} {...this.props}>
        <div className="profile-photos">
          {this.props.userPosts.posts.map(id => this.renderPost(id))}
        </div>
      </InfiniteScroll>
    );
  }
}

export default PostsView;
