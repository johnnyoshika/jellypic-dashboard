import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';
import { addEntities } from './entities';
import { COMMENT_STATE } from './actionTypes';

const changeState = (postId, state) => {
  return {
    type: COMMENT_STATE,
    payload: makePayload(postId, {
      state: state,
      error: null
    })
  };
};

const saveFailed = (postId, message) => {
  return {
    type: COMMENT_STATE,
    payload: makePayload(postId, {
      state: 'error',
      error: message
    })
  };
};

const saveSucceeded = postId => {
  return {
    type: COMMENT_STATE,
    payload: makePayload(postId, {
      state: 'idle',
      error: null
    })
  };
};

const addComment = (postId, text) =>
  save(postId, `/api/posts/${postId}/comments`, {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      text
    })
  });

const deleteComment = (postId, commentId) =>
  save(postId, `/api/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include'
  });

const save = (postId, url, options) => {
  return (dispatch, getState) => {
    dispatch(changeState(postId, 'saving'));

    return request(url, options).then(
      response => {
        const data = normalize(response.json, postSchema);
        dispatch(saveSucceeded(postId));
        dispatch(addEntities(data.entities));
      },
      error => dispatch(saveFailed(postId, error.message))
    );
  };
};

const makePayload = (postId, data) => {
  const payload = {};
  payload[postId] = data;
  return payload;
};

export { addComment, deleteComment };
