import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

export default {
  state: {
    id: null,
    state: 'idle', // loading,idle,error,success
    error: null
  },
  reducers: {
    changeState: (state, { id, newState }) => ({
      ...state,
      ...{ id: id, state: newState, error: null }
    }),
    fetchFailed: (state, { message }) => ({
      ...state,
      ...{ state: 'error', error: message }
    })
  },
  effects: {
    async fetchPost({ id }, rootState) {
      this.changeState({ id, newState: 'loading' });

      try {
        const response = await request(`/api/posts/${id}`, {
          credentials: 'include'
        });

        const data = normalize(response.json, postSchema);
        dispatch.entities.add(data.entities);
        this.changeState({ id, newState: 'success' });
      } catch (error) {
        this.fetchFailed({ message: error.message });
      }
    }
  }
};
