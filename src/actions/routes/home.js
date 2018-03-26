import { appendPosts, replacePosts } from '../entities';
import request from '../../utils/request';
import { ROUTE_HOME_STATE } from '../actionTypes';

const changeState = state => {
  return {
    type: ROUTE_HOME_STATE,
    payload: {
      state,
      error: null
    }
  };
};

const fetchFailed = message => {
  return {
    type: ROUTE_HOME_STATE,
    payload: {
      state: 'error',
      error: message
    }
  };
};

const changeNextUrl = nextUrl => {
  return {
    type: ROUTE_HOME_STATE,
    payload: {
      nextUrl
    }
  };
};

const fetchLatest = () => {
  return (dispatch, getState) =>
    fetchPosts(dispatch, getState, getState().routes.home.url).then(
      posts => posts.length && dispatch(replacePosts(posts)),
      error => {
        if (getState().routes.home.posts.length) dispatch(changeState('idle'));
        else dispatch(fetchFailed(error.message));
      }
    );
};

const fetchNext = () => {
  return (dispatch, getState) =>
    fetchPosts(dispatch, getState, getState().routes.home.nextUrl).then(
      posts => posts.length && dispatch(appendPosts(posts)),
      error => dispatch(fetchFailed(error.message))
    );
};

const fetchPosts = (dispatch, getState, url) => {
  if (!url) return Promise.resolve({ data: [] });
  if (getState().routes.home.state === 'loading')
    return Promise.resolve({ data: [] });

  dispatch(changeState('loading'));

  return request(url, {
    credentials: 'include'
  }).then(response => {
    dispatch(changeState('idle'));
    dispatch(changeNextUrl(response.json.pagination.nextUrl));
    return response.json.data;
  });
};

export { fetchLatest, fetchNext };
