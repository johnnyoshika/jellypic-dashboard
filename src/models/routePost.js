import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

export default {
  state: {
    id: null,
    status: 'idle', // loading,idle,error,success
    error: null
  },
  reducers: {
    changeStatus: (state, { id, status }) => ({
      ...state,
      ...{ id: id, status: status, error: null }
    }),
    fetchFailed: (state, { message }) => ({
      ...state,
      ...{ status: 'error', error: message }
    })
  },
  effects: {
    async fetchPost({ id }, rootState) {
      this.changeStatus({ id, status: 'loading' });

      try {
        const response = await request(`/api/posts/${id}`, {
          credentials: 'include'
        });

        const data = normalize(response.json, postSchema);
        dispatch.entities.add(data.entities);
        this.changeStatus({ id, status: 'success' });
      } catch (error) {
        this.fetchFailed({ message: error.message });
      }
    }
  }
};
