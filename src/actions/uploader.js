import request from '../utils/request';
import { prependPosts } from './entities';
import { UPLOADER_STATE } from './actionTypes';

const changeState = state => {
  return {
    type: UPLOADER_STATE,
    payload: {
      state: state,
      error: null
    }
  };
};

const saveFailed = message => {
  return {
    type: UPLOADER_STATE,
    payload: {
      state: 'error',
      error: message
    }
  };
};

const saveSucceeded = () => {
  return {
    type: UPLOADER_STATE,
    payload: {
      state: 'idle',
      error: null
    }
  };
};

const savePost = cloudinaryPublicIds => {
  return (dispatch, getState) => {
    dispatch(changeState('saving'));

    return request('/api/posts', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(
        cloudinaryPublicIds.map(id => ({
          cloudinaryPublicId: id
        }))
      )
    }).then(
      response => {
        dispatch(saveSucceeded());
        dispatch(prependPosts(response.json.data));
      },
      error => dispatch(saveFailed(error.message))
    );
  };
};

export { savePost };
