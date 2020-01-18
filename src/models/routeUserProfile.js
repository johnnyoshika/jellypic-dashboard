import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from 'utils/request';
import { user as userSchema, profile as profileSchema } from 'store/schema';

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
    async fetchProfile({ id }, rootState) {
      try {
        this.changeStatus({ id, status: 'loading' });

        const responses = await Promise.all([
          request(`/api/users/${id}`, {
            credentials: 'include'
          }),
          request(`/api/profiles/${id}`, {
            credentials: 'include'
          })
        ]);

        dispatch.entities.add(
          normalize(responses[0].json, userSchema).entities
        );
        dispatch.entities.add(
          normalize(responses[1].json, profileSchema).entities
        );
        this.changeStatus({ id, status: 'success' });
      } catch (error) {
        this.fetchFailed({ message: error.message });
      }
    }
  }
};
