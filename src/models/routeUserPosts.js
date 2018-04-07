import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import request from '../utils/request';
import { post as postSchema } from '../store/schema';

const fetchPosts = (rootState, id, url) => {
  if (!url) return Promise.resolve({ data: [] });
  if (rootState.routeUserPosts.status === 'loading')
    return Promise.resolve({ data: [] });

  dispatch.routeUserPosts.changeStatus({ id, status: 'loading' });

  return request(url, {
    credentials: 'include'
  }).then(response => {
    const data = normalize(response.json.data, [postSchema]);
    dispatch.entities.add(data.entities);
    dispatch.routeUserPosts.fetchSucceeded({
      nextUrl: response.json.pagination.nextUrl
    });
    return response.json.data;
  });
};

const getUserPostIds = (userId, rootState) => {
  if (!rootState.entities.hasOwnProperty('posts')) return [];

  return Object.keys(rootState.entities.posts)
    .map(key => rootState.entities.posts[key])
    .filter(post => post.user === userId)
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(post => post.id);
};

export default {
  state: {
    id: null,
    status: 'idle', // loading,idle,error
    error: null,
    nextUrl: null,
    posts: []
  },
  reducers: {
    changeStatus: (state, { id, status }) => ({
      ...state,
      ...{ id: id, status: status, error: null }
    }),
    fetchFailed: (state, { message }) => ({
      ...state,
      ...{ status: 'error', error: message }
    }),
    fetchSucceeded: (state, { nextUrl }) => ({
      ...state,
      ...{ status: 'idle', nextUrl }
    }),
    replacePosts: (state, { posts }) => ({
      ...state,
      ...{ posts: posts.map(p => p.id) }
    }),
    replacePostIds: (state, { postsIds }) => ({
      ...state,
      ...{ posts: postsIds }
    }),
    appendPosts: (state, { posts }) => ({
      ...state,
      ...{ posts: [...state.posts, ...posts.map(p => p.id)] }
    })
  },
  effects: {
    async fetchLatest({ id }, rootState) {
      this.replacePostIds({ postsIds: getUserPostIds(id, rootState) });
      try {
        const posts = await fetchPosts(
          rootState,
          id,
          `/api/posts?userId=${id}`
        );
        if (posts.length) this.replacePosts({ posts });
      } catch (error) {
        if (rootState.routeUserPosts.posts.length)
          this.changeStatus({ status: 'idle' });
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
