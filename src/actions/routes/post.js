import { normalize } from 'normalizr';
import request from '../../utils/request';
import { post as postSchema } from '../../store/schema';
import { addEntities } from '../entities';
import { ROUTE_POST_STATE } from '../actionTypes';

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

    return request(`/api/posts/${id}`, {
      credentials: 'include'
    }).then(
      response => {
        const data = normalize(response.json, postSchema);
        dispatch(addEntities(data.entities));
        dispatch(changeState('success'));
      },
      error => dispatch(fetchFailed(error.message))
    );
  };
};

export { fetchPost };
