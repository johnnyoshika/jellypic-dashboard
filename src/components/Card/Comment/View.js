import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({
  session,
  postId,
  comment,
  deleteComment
}) => {
  return (
    <div className="card-info-comment">
      <div className="card-info-comment-user pull-left">
        <Link to={'/users/' + comment.user.id}>
          {comment.user.username}
        </Link>
      </div>
      {session.user === comment.user.id && (
        <div className="pull-right">
          <a onClick={() => deleteComment(postId, comment.id)}>
            <i className="fa fa-times-circle" aria-hidden="true" />
          </a>
        </div>
      )}
      {comment.text}
    </div>
  );
};

export default Comment;
