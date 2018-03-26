import { appendUserPosts, replaceUserPosts } from '../entities';
import request from '../../utils/request';
import { ROUTE_USER_POSTS_STATE } from '../actionTypes';

const changeState = (id, state) => {
  return {
    type: ROUTE_USER_POSTS_STATE,
    payload: {
      id,
      state,
      error: null
    }
  };
};

const fetchFailed = message => {
  return {
    type: ROUTE_USER_POSTS_STATE,
    payload: {
      state: 'error',
      error: message
    }
  };
};

const changeNextUrl = nextUrl => {
  return {
    type: ROUTE_USER_POSTS_STATE,
    payload: {
      nextUrl
    }
  };
};

const fetchLatest = id => {
  return (dispatch, getState) =>
    fetchPosts(dispatch, getState, id, `/api/posts?userId=${id}`, 'refreshing').then(
      posts => posts.length && dispatch(replaceUserPosts(posts)),
      error => {
        if (getState().routes.userPosts.posts.length)
          dispatch(changeState('idle'));
        else dispatch(fetchFailed(error.message));
      }
    );
};

const fetchNext = id => {
  return (dispatch, getState) =>
    fetchPosts(
      dispatch,
      getState,
      id,
      getState().routes.userPosts.nextUrl,
      'loading'
    ).then(
      posts => posts.length && dispatch(appendUserPosts(posts)),
      error => dispatch(fetchFailed(error.message))
    );
};

const fetchPosts = (dispatch, getState, id, url, nextState) => {
  if (!url) return Promise.resolve({ data: [] });
  if (getState().routes.userPosts.state === 'loading' || getState().routes.userPosts.state === 'refreshing')
    return Promise.resolve({ data: [] });

  dispatch(changeState(id, nextState));

  return request(url, {
    credentials: 'include'
  }).then(response => {
    dispatch(changeState(id, 'idle'));
    dispatch(changeNextUrl(response.json.pagination.nextUrl));
    return response.json.data;
  });
};

export { fetchLatest, fetchNext };
