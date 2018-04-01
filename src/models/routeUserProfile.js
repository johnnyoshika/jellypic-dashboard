import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { user as userSchema, profile as profileSchema } from '../store/schema';

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
    async fetchProfile({ id }, rootState) {
      try {
        this.changeState({ id, newState: 'loading' });

        const responses = await Promise.all([
          request(`/api/users/${id}`, {
            credentials: 'include'
          }),
          request(`/api/profiles/${id}`, {
            credentials: 'include'
          })
        ]);

        dispatch.entities2.add(
          normalize(responses[0].json, userSchema).entities
        );
        dispatch.entities2.add(
          normalize(responses[1].json, profileSchema).entities
        );
        this.changeState({ id, newState: 'success' });
      } catch (error) {
        this.fetchFailed({ message: error.message });
      }
    }
  }
};
