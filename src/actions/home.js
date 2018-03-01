import { appendPosts, replacePosts } from './entities';
import { ROUTE_HOME_STATE } from './actionTypes';

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
    fetchPosts(dispatch, getState, getState().routes.home.url)
      .then(posts => dispatch(replacePosts(posts)))
      .catch(error => {
        if (getState().routes.home.posts.length)
          dispatch(changeState('idle'));
        else
          dispatch(fetchFailed(error.message));
      });
};

const fetchNext = () => {
  return (dispatch, getState) =>
    fetchPosts(dispatch, getState, getState().routes.home.nextUrl)
      .then(posts => dispatch(appendPosts(posts)))
      .catch(error => dispatch(fetchFailed(error.message)));
};

const fetchPosts = (dispatch, getState, url) => {
  if (!url) return Promise.resolve({ data: [] });

  dispatch(changeState('loading'));

  return fetch(url, {
    credentials: 'include'
  }).then(response => {
    if (!response.headers.get('Content-Type').includes('application/json'))
      throw new Error('Error connecting to the server. Please try again!');

    return response.json().then(json => {
      if (!response.ok) throw new Error(json.message);

      dispatch(changeState('idle'));
      dispatch(changeNextUrl(json.pagination.nextUrl));
      return json.data;
    });
  });
};

export { fetchLatest, fetchNext };
