import { appendPosts } from './entities';
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

const fetchNext = () => {
  return (dispatch, getState) => {
    dispatch(changeState('loading'));

    return fetch(getState().routes.home.nextUrl, {
      credentials: 'include'
    })
      .then(response => {
        if (
          response.headers
            .get('Content-Type')
            .split(';')[0]
            .toLowerCase()
            .trim() !== 'application/json'
        )
          throw new Error('Error connecting to the server. Please try again!');

        response.json().then(json => {
          if (response.ok) {
            dispatch(appendPosts(json.data));
            dispatch(changeNextUrl(json.pagination.nextUrl));
            dispatch(changeState('idle'));
          } else {
            dispatch(fetchFailed(json.message));
          }
        });
      })
      .catch(error => dispatch(fetchFailed(error.message)));
  };
};

export { fetchNext };
