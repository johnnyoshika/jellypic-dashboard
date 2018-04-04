import React, { Component } from 'react';
import ErrorMessage from '../../../../components/ErrorMessage';
import { selectPost } from '../../../../utils/selectors';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

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

  renderError() {
    return (
      <div className="text-center mt-40 mb-40">
        <ErrorMessage message={this.props.userPosts.error} />
      </div>
    );
  }

  renderSpinner() {
    return (
      <div className="text-center mt-40 mb-40">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
      </div>
    );
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
      <React.Fragment>
        <div className="profile-photos">
          {this.props.userPosts.posts.map(id => this.renderPost(id))}
        </div>
        {this.props.userPosts.status === 'error' && this.renderError()}
        {this.props.userPosts.status === 'loading' && this.renderSpinner()}
      </React.Fragment>
    );
  }
}

export default PostsView;
