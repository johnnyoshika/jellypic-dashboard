import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

const fetchPosts = (rootState, id, url, nextState) => {
  if (!url) return Promise.resolve({ data: [] });
  if (
    rootState.routeUserPosts.state === 'loading' ||
    rootState.routeUserPosts.state === 'refreshing'
  )
    return Promise.resolve({ data: [] });

  dispatch.routeUserPosts.changeState({ id, newState: nextState });

  return request(url, {
    credentials: 'include'
  }).then(response => {
    const data = normalize(response.json.data, [postSchema]);
    dispatch.entities2.add(data.entities);
    dispatch.routeUserPosts.fetchSucceeded({
      nextUrl: response.json.pagination.nextUrl
    });
    return response.json.data;
  });
};

export default {
  state: {
    id: null,
    state: 'idle', // refreshing,loading,idle,error
    error: null,
    nextUrl: null,
    posts: []
  },
  reducers: {
    changeState: (state, { id, newState }) => ({
      ...state,
      ...{ id: id, state: newState, error: null }
    }),
    fetchFailed: (state, { message }) => ({
      ...state,
      ...{ state: 'error', error: message }
    }),
    fetchSucceeded: (state, { nextUrl }) => ({
      ...state,
      ...{ state: 'idle', nextUrl }
    }),
    replacePosts: (state, { posts }) => ({
      ...state,
      ...{ posts: posts.map(p => p.id) }
    }),
    appendPosts: (state, { posts }) => ({
      ...state,
      ...{ posts: [...state.posts, ...posts.map(p => p.id)] }
    })
  },
  effects: {
    async fetchLatest({ id }, rootState) {
      try {
        const posts = await fetchPosts(
          rootState,
          id,
          `/api/posts?userId=${id}`,
          'refreshing'
        );
        if (posts.length) this.replacePosts({ posts });
      } catch (error) {
        if (rootState.routeUserPosts.posts.length)
          this.changeState({ newState: 'idle' });
        else this.fetchFailed({ message: error.message });
      }
    },
    async fetchNext({ id }, rootState) {
      try {
        const posts = await fetchPosts(
          rootState,
          id,
          rootState.routeUserPosts.nextUrl,
          'loading'
        );
        if (posts.length) this.appendPosts({ posts });
      } catch (error) {
        this.fetchFailed({ message: error.message });
      }
    }
  }
};
