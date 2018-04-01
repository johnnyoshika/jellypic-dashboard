import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

const makePayload = (postId, data) => {
  const payload = {};
  payload[postId] = data;
  return payload;
};

const save = (postId, url, options) => {
  dispatch.commentState.changeState({ postId, newState: 'saving' });

  return request(url, options).then(
    response => {
      const data = normalize(response.json, postSchema);
      dispatch.commentState.saveSucceeded({ postId });
      dispatch.entities2.add(data.entities);
    },
    error => dispatch.commentState.saveFailed(postId, error.message)
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
    async addComment({ postId, text }, rootState) {
      await save(postId, `/api/posts/${postId}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          text
        })
      });
    },
    async deleteComment({ postId, commentId }, rootState) {
      await save(postId, `/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
    }
  }
};
