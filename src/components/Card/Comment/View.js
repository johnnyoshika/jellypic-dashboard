import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
  <div className="card-info-comment">
    <div className="card-info-comment-user pull-left">
      <Link to={'/users/' + props.comment.user.id}>
        {props.comment.user.username}
      </Link>
    </div>
    {props.session.user === props.comment.user.id && (
      <div className="pull-right">
        <a onClick={() => props.deleteComment(props.postId, props.comment.id)}>
          <i className="fa fa-times-circle" aria-hidden="true" />
        </a>
      </div>
    )}
    {props.comment.text}
  </div>
);
