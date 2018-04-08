import React, { Component } from 'react';
import MaybeStatus from '../../../../components/MaybeStatus';
import { selectPost } from '../../../../utils/selectors';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

const Status = MaybeStatus(
  props => props.userPosts.status === 'error',
  props => props.userPosts.status === 'loading'
);

class PostsView extends Component {
  constructor() {
    super();

    // REACT ES6 classes don't autobind, so bind it in the constructor
    // as suggested here: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    this.props.fetchLatest(this.props.id);
    window.addEventListener('scroll', this.onScroll, false);
  }

  // had to put this here b/c when router goes from /users/1 to /user/2, new component doesn't get mounted.
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.fetchLatest(nextProps.id);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    if (!this.props.userPosts.posts.length) return;

    if (window.innerHeight + window.scrollY < document.body.offsetHeight - 500)
      return;

    if (this.props.userPosts.status !== 'idle') return;
    
    if (!this.props.userPosts.nextUrl) return;

    this.props.fetchNext(this.props.userPosts.id);
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
      <Status message={this.props.userPosts.error} {...this.props}>
        <div className="profile-photos">
          {this.props.userPosts.posts.map(id => this.renderPost(id))}
        </div>
      </Status>
    );
  }
}

export default PostsView;
