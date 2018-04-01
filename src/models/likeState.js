import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

const makePayload = (postId, data) => {
  const payload = {};
  payload[postId] = data;
  return payload;
};

const save = (postId, method) => {
  dispatch.likeState.changeState({ postId, newState: 'saving' });

  return request(`/api/posts/${postId}/likes`, {
    method: method,
    credentials: 'include'
  }).then(
    response => {
      const data = normalize(response.json, postSchema);
      dispatch.likeState.saveSucceeded({ postId });
      dispatch.entities2.add(data.entities);
    },
    error => dispatch.likeState.saveFailed({ postId, message: error.message })
  );
};

export default {
  state: {},
  reducers: {
    changeState: (state, { postId, newState }) => ({
      ...state,
      ...makePayload(postId, { state: newState, error: null })
    }),
    saveFailed: (state, { postId, message }) => ({
      ...state,
      ...makePayload(postId, {
        state: 'error',
        error: message
      })
    }),
    saveSucceeded: (state, { postId }) => ({
      ...state,
      ...makePayload(postId, {
        state: 'idle',
        error: null
      })
    })
  },
  effects: {
    async like({ postId }, rootState) {
      await save(postId, 'PUT');
    },
    async unlike({ postId }, rootState) {
      await save(postId, 'DELETE');
    }
  }
};
