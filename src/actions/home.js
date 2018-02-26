import { normalize } from 'normalizr';
import { post as postSchema } from '../store/schema';
import { addEntities } from './entities';
import {
  ROUTE_HOME_STATE,
  ROUTE_HOME_PREPEND,
  ROUTE_HOME_APPEND
} from './actionTypes';

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

const appendPostIds = ids => {
  return {
    type: ROUTE_HOME_APPEND,
    payload: {
      ids
    }
  };
};

const prependPostIds = ids => {
  return {
    type: ROUTE_HOME_PREPEND,
    payload: {
      ids
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
            const data = normalize(json.data, [postSchema]);
            dispatch(addEntities(data.entities));
            dispatch(appendPostIds(data.result));
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

export { prependPostIds, fetchNext };
