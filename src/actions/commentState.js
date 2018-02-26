import { normalize } from 'normalizr';
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

const save = (postId, url, request) => {
  return (dispatch, getState) => {
    dispatch(changeState(postId, 'saving'));

    return fetch(url, request)
      .then(response => {
        if (
          response.headers
            .get('Content-Type')
            .split(';')[0]
            .toLowerCase()
            .trim() !== 'application/json'
        )
          throw new Error('Error connecting to the server. Please try again!');

        response.json().then(json => {
          if (!response.ok) {
            dispatch(saveFailed(postId, json.message));
            return;
          }

          const data = normalize(json, postSchema);
          dispatch(saveSucceeded(postId));
          dispatch(addEntities(data.entities));
        });
      })
      .catch(error => dispatch(saveFailed(postId, error.message)));
  };
};

const makePayload = (postId, data) => {
  const payload = {};
  payload[postId] = data;
  return payload;
};

export { addComment, deleteComment };
