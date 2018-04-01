import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { user as userSchema } from '../store/schema';

export default {
  state: {
    state: 'anonymous', // checking,anonymous,authenticated,error
    error: null,
    user: null
  },
  reducers: {
    changeState: (state, { newState }) => ({
      ...state,
      ...{ state: newState, error: null, user: null }
    }),
    setSession: (state, { userId }) => ({
      ...state,
      ...{ state: 'authenticated', user: userId }
    }),
    authenticationFailed: (state, { message }) => ({
      ...state,
      ...{ state: 'error', error: message, user: null }
    })
  },
  effects: {
    async authenticate(payload, rootState) {
      this.changeState({ newState: 'checking' });

      try {
        const response = await request('/api/sessions/me', {
          credentials: 'include'
        });

        const data = normalize(response.json, userSchema);
        dispatch.entities.add(data.entities);
        this.setSession({ userId: data.result });
      } catch (error) {
        if (error.status === 401) this.changeState({ newState: 'anonymous' });
        else this.authenticationFailed({ message: error.message });
      }
    }
  }
};
