import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from 'utils/request';
import { post as postSchema } from 'store/schema';

export default {
  state: {
    status: 'idle', // idle,saving,error
    error: null
  },
  reducers: {
    changeStatus: (state, { status }) => ({
      ...state,
      ...{ status: status, error: null }
    }),
    saveFailed: (state, { message }) => ({
      ...state,
      ...{ status: 'error', error: message }
    }),
    saveSucceeded: state => ({
      ...state,
      ...{ status: 'idle', error: null }
    })
  },
  effects: {
    async savePost({ cloudinaryPublicIds }, rootState) {
      this.changeStatus({ status: 'saving' });

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
        dispatch.entities.add(data.entities);
        dispatch.routeHome.prependPosts({ posts: response.json.data });
        this.saveSucceeded();
      } catch (error) {
        this.saveFailed({ message: error.message });
      }
    }
  }
};
