import { normalize } from 'normalizr';
import request from '../../utils/request';
import { user as userSchema } from '../../store/schema';
import { addEntities } from '../entities';
import { ROUTE_SESSION_STATE } from '../actionTypes';

const changeState = state => {
  return {
    type: ROUTE_SESSION_STATE,
    payload: {
      state,
      error: null,
      user: null
    }
  };
};

const setSession = userId => {
  return {
    type: ROUTE_SESSION_STATE,
    payload: {
      state: 'authenticated',
      user: userId
    }
  };
};

const authenticationFailed = message => {
  return {
    type: ROUTE_SESSION_STATE,
    payload: {
      state: 'error',
      error: message,
      user: null
    }
  };
};

const authenticate = () => {
  return (dispatch, getState) => {
    dispatch(changeState('checking'));

    return request('/api/sessions/me', {
      credentials: 'include'
    }).then(
      response => {
        const data = normalize(response.json, userSchema);
        dispatch(addEntities(data.entities));
        dispatch(setSession(data.result));
      },
      error => {
        if (error.status === 401) dispatch(changeState('anonymous'));
        else dispatch(authenticationFailed(error.message));
      }
    );
  };
};

export { authenticate };
