import { normalize } from 'normalizr';
import { post as postSchema } from '../store/schema';
import { addEntities } from './entities';
import { LIKE_STATE } from './actionTypes';

const changeState = (postId, state) => {
  return {
    type: LIKE_STATE,
    payload: makePayload(postId, {
      state: state,
      error: null
    })
  };
};

const saveFailed = (postId, message) => {
  return {
    type: LIKE_STATE,
    payload: makePayload(postId, {
      state: 'error',
      error: message
    })
  };
};

const saveSucceeded = postId => {
  return {
    type: LIKE_STATE,
    payload: makePayload(postId, {
      state: 'idle',
      error: null
    })
  };
};

const like = postId => save(postId, 'PUT');

const unlike = postId => save(postId, 'DELETE');

const save = (postId, method) => {
  return (dispatch, getState) => {
    dispatch(changeState(postId, 'saving'));

    return fetch(`/api/posts/${postId}/likes`, {
      method: method,
      credentials: 'include'
    })
      .then(response => {
        if (!response.headers.get('Content-Type').includes('application/json'))
          throw new Error('Error connecting to the server. Please try again!');

        return response.json().then(json => {
          if (!response.ok) throw new Error(json.message);

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

export { like, unlike };
