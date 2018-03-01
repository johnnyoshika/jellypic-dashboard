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

    return fetch('/api/posts', {
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
    })
      .then(response => {
        if (!response.headers.get('Content-Type').includes('application/json'))
          throw new Error('Error connecting to the server. Please try again!');

        return response.json().then(json => {
          if (!response.ok) throw new Error(json.message);

          dispatch(saveSucceeded());
          dispatch(prependPosts(json.data));
        });
      })
      .catch(error => dispatch(saveFailed(error.message)));
  };
};

export { savePost };
