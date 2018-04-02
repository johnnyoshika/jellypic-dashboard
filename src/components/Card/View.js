import React, { Component } from 'react';
import Comment from './Comment';
import Moment from 'react-moment';
import { Image } from 'cloudinary-react';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';
import './Styles.css';

class Card extends Component {
  constructor() {
    super();

    this.state = {
      comment: ''
    };

    // REACT ES6 classes don't autobind, so bind it in the constructor
    // as suggested here: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md#es6-classes
    this.toggleLike = this.toggleLike.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.commentDisabled = this.commentDisabled.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLikeState(nextProps);
    this.checkCommentState(nextProps);
  }

  checkLikeState(nextProps) {
    if (this.likeState(nextProps.likeState).status === 'error')
      if (this.likeState().error !== this.likeState(nextProps.likeState).error)
        toastr.error(this.likeState(nextProps.likeState).error);
  }

  toggleLike() {
    if (this.likeIsDirty()) return;

    if (this.liked()) this.props.unlike(this.props.post.id);
    else this.props.like(this.props.post.id);
  }

  liked() {
    return this.props.post.likes.some(
      like => like.user.id === this.props.session.user
    );
  }

  likeIsDirty() {
    return this.likeState().status === 'saving';
  }

  likeState(state) {
    state = state || this.props.likeState;
    return state[this.props.post.id] || {};
  }

  checkCommentState(nextProps) {
    if (this.commentState(nextProps.commentState).status === 'error')
      if (
        this.commentState().error !==
        this.commentState(nextProps.commentState).error
      )
        toastr.error(this.commentState(nextProps.commentState).error);

    if (this.commentState().status === 'saving')
      if (this.commentState(nextProps.commentState).status !== 'error')
        this.setState({ comment: '' });
  }

  onKeyPress(target) {
    if (target.charCode === 13) this.addComment();
  }

  onCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  addComment() {
    this.setState({ commentDisabled: true });
    this.props.addComment(this.props.post.id, this.state.comment);
  }

  commentState(state) {
    state = state || this.props.commentState;
    return state[this.props.post.id] || {};
  }

  commentDisabled() {
    return this.commentState().status === 'saving';
  }

  render() {
    return (
      <div className="card">
        <div className="card-heading">
          <div className="card-heading-user">
            <div className="card-heading-user-image">
              <img
                src={this.props.post.user.thumbUrl}
                alt={this.props.post.user.username}
                crossOrigin="anonymous"
              />
            </div>
            <div className="card-heading-user-name">
              <Link to={'/users/' + this.props.post.user.id}>
                {this.props.post.user.username}
              </Link>
            </div>
          </div>
          <div className="card-heading-time text-right">
            <Link to={'/posts/' + this.props.post.id}>
              <Moment fromNow ago unix>
                {this.props.post.createdAt}
              </Moment>
            </Link>
          </div>
        </div>
        <div className="card-photo">
          <Image
            className="image-100"
            crossOrigin="anonymous"
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={this.props.post.cloudinaryPublicId}
            crop="fit"
            height="600"
            width="600"
            secure
          />
        </div>
        <div className="card-info">
          <div className="card-info-likes">
            {this.props.post.likes.length} likes
          </div>
          <div className="card-info-comments">
            {this.props.post.comments.map(comment => (
              <Comment
                key={comment.id}
                postId={this.props.post.id}
                comment={comment}
              />
            ))}
          </div>
          <div className="card-info-add-comment">
            <div>
              <a onClick={this.toggleLike}>
                <i
                  className={
                    'fa fa-heart fa-2x' +
                    (this.liked() ? ' red-icon' : '') +
                    (this.likeIsDirty() ? ' barely-visible' : '')
                  }
                  aria-hidden="true"
                />
              </a>
            </div>
            <div>
              <input
                className="card-info-add-comment-input"
                type="text"
                value={this.state.comment}
                onChange={this.onCommentChange}
                onKeyPress={this.onKeyPress}
                disabled={this.commentDisabled()}
                placeholder="Add a comment..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
