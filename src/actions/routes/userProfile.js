import { normalize } from 'normalizr';
import request from '../../utils/request';
import { user as userSchema, profile as profileSchema } from '../../store/schema';
import { addEntities } from '../entities';
import { ROUTE_USER_PROFILE_STATE } from '../actionTypes';

const changeState = (id, state) => {
  return {
    type: ROUTE_USER_PROFILE_STATE,
    payload: {
      id,
      state,
      error: null
    }
  };
};

const fetchFailed = message => {
  return {
    type: ROUTE_USER_PROFILE_STATE,
    payload: {
      state: 'error',
      error: message
    }
  };
};

const fetchProfile = id => {
  return (dispatch, getState) => {
    dispatch(changeState(id, 'loading'));

    return Promise.all([
      request(`/api/users/${id}`, {
        credentials: 'include'
      }),
      request(`/api/profiles/${id}`, {
        credentials: 'include'
      })
    ])
    .then(
      responses => {
        dispatch(addEntities(normalize(responses[0].json, userSchema).entities));
        dispatch(addEntities(normalize(responses[1].json, profileSchema).entities));
        dispatch(changeState(id, 'success'));
      },
      error => dispatch(fetchFailed(error.message))
    );
  };
};

export { fetchProfile };
