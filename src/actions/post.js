import { normalize } from 'normalizr';
import { post as postSchema } from '../store/schema';
import { addEntities } from './entities';
import { ROUTE_POST_STATE } from './actionTypes';

const changeState = state => {
  return {
    type: ROUTE_POST_STATE,
    payload: {
      state,
      error: null
    }
  };
};

const fetchFailed = message => {
  return {
    type: ROUTE_POST_STATE,
    payload: {
      state: 'error',
      error: message
    }
  };
};

const fetchPost = id => {
  return (dispatch, getState) => {
    dispatch(changeState('loading'));

    return fetch(`/api/posts/${id}`, {
      credentials: 'include'
    })
      .then(response => {
        if (!response.headers.get('Content-Type').includes('application/json'))
          throw new Error('Error connecting to the server. Please try again!');

        return response.json().then(json => {
          if (!response.ok) throw new Error(json.message);

          const data = normalize(json, postSchema);
          dispatch(addEntities(data.entities));
          dispatch(changeState('success'));
        });
      })
      .catch(error => dispatch(fetchFailed(error.message)));
  };
};

export { fetchPost }
