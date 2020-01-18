import React, { useEffect } from 'react';
import Card from 'components/Card';
import WithStatus from 'components/WithStatus';
import { selectPost } from 'utils/selectors';
import './Styles.css';

const getPost = ({ post, entities }) => selectPost(entities, post.id);

const Status = WithStatus(
  ({ post, entities }) => post.status === 'error' && !getPost({ post, entities }),
  ({ post, entities }) => post.status === 'loading' && !getPost({ post, entities })
);

const PostView = ({
  match: { params: { id } },
  post,
  entities,
  fetchPost
}) => {
  
  useEffect(() => {
    fetchPost(parseInt(id, 10));
  }, [fetchPost, id]);

  return (
    <div className="post-container">
      <div className="gutter" />
      <div className="post-main">
        <Status
          message={post.error}
          post={post}
          entities={entities}
        >
          {getPost({ post, entities }) && (
            <Card key={id} post={getPost({ post, entities })} /> 
          )}
        </Status>
      </div>
      <div className="gutter" />
    </div>
  );
};

export default PostView;
