import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

export default {
  state: {
    state: 'idle', // idle,saving,error
    error: null
  },
  reducers: {
    changeState: (state, { newState }) => ({
      ...state,
      ...{ state: newState, error: null }
    }),
    saveFailed: (state, { message }) => ({
      ...state,
      ...{ state: 'error', error: message }
    }),
    saveSucceeded: state => ({
      ...state,
      ...{ state: 'idle', error: null }
    })
  },
  effects: {
    async savePost({ cloudinaryPublicIds }, rootState) {
      this.changeState({ newState: 'saving' });

      try {
        const response = await request('/api/posts', {
          method: 'POST',
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(
            cloudinaryPublicIds.map(id => ({
              cloudinaryPublicId: id
            }))
          )
        });

        const data = normalize(response.json.data, [postSchema]);
        dispatch.entities2.add(data.entities);
        dispatch.routeHome.prependPosts({ posts: response.json.data });
        this.saveSucceeded();
      } catch (error) {
        this.saveFailed({ message: error.message });
      }
    }
  }
};
