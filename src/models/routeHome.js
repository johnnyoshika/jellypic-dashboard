import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

const fetchPosts = (rootState, url) => {
  if (!url) return Promise.resolve({ data: [] });
  if (rootState.routeHome.state === 'loading')
    return Promise.resolve({ data: [] });

  dispatch.routeHome.changeState({ newState: 'loading' });

  return request(url, {
    credentials: 'include'
  }).then(response => {
    const data = normalize(response.json.data, [postSchema]);
    dispatch.entities.add(data.entities);
    dispatch.routeHome.fetchSucceeded({
      nextUrl: response.json.pagination.nextUrl
    });
    return response.json.data;
  });
};

export default {
  state: {
    state: 'idle', // loading,idle,error
    error: null,
    url: '/api/posts',
    nextUrl: null,
    posts: []
  },
  reducers: {
    changeState: (state, { newState }) => ({
      ...state,
      ...{ state: newState, error: null }
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
      ...{ posts: [...posts.map(p => p.id)] }
    }),
    prependPosts: (state, { posts }) => ({
      ...state,
      ...{ posts: [...posts.map(p => p.id), ...state.posts] }
    }),
    appendPosts: (state, { posts }) => ({
      ...state,
      ...{ posts: [...state.posts, ...posts.map(p => p.id)] }
    })
  },
  effects: {
    async fetchLatest(payload, rootState) {
      try {
        const posts = await fetchPosts(rootState, rootState.routeHome.url);
        if (posts.length) this.replacePosts({ posts });
      } catch (error) {
        if (rootState.routeHome.posts.length)
          this.changeState({ newState: 'idle' });
        else this.fetchFailed({ message: error.message });
      }
    },
    async fetchNext(payload, rootState) {
      try {
        const posts = await fetchPosts(rootState, rootState.routeHome.nextUrl);
        if (posts.length) this.appendPosts({ posts });
      } catch (error) {
        this.fetchFailed({ message: error.message });
      }
    }
  }
};
