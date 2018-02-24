import { normalize } from 'normalizr';
import { post as postSchema } from '../store/schema';
import { addEntities } from './entities';
import { UPLOADER_STATE } from './actionTypes';

// import { prependPostIds } from '../routes/Session/Home/modules/home' // feels ugly reaching in like this

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
        if (
          response.headers
            .get('Content-Type')
            .split(';')[0]
            .toLowerCase()
            .trim() !== 'application/json'
        )
          throw new Error('Error connecting to the server. Please try again!');

        response.json().then(json => {
          if (!response.ok) {
            dispatch(saveFailed(json.message));
            return;
          }

          const data = normalize(json.data, [postSchema]);
          dispatch(saveSucceeded());
          dispatch(addEntities(data.entities));
          // dispatch(prependPostIds(data.result));
        });
      })
      .catch(error => dispatch(saveFailed(error.message)));
  };
};

export { savePost };
