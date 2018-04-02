import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { user as userSchema } from '../store/schema';

export default {
  state: {
    status: 'anonymous', // checking,anonymous,authenticated,error
    error: null,
    user: null
  },
  reducers: {
    changeStatus: (state, { status }) => ({
      ...state,
      ...{ status: status, error: null, user: null }
    }),
    setSession: (state, { userId }) => ({
      ...state,
      ...{ status: 'authenticated', user: userId }
    }),
    authenticationFailed: (state, { message }) => ({
      ...state,
      ...{ status: 'error', error: message, user: null }
    })
  },
  effects: {
    async authenticate(payload, rootState) {
      this.changeStatus({ status: 'checking' });

      try {
        const response = await request('/api/sessions/me', {
          credentials: 'include'
        });

        const data = normalize(response.json, userSchema);
        dispatch.entities.add(data.entities);
        this.setSession({ userId: data.result });
      } catch (error) {
        if (error.status === 401) this.changeStatus({ status: 'anonymous' });
        else this.authenticationFailed({ message: error.message });
      }
    }
  }
};
