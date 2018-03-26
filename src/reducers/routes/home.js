import {
  ROUTE_HOME_STATE,
  POSTS_PREPEND,
  POSTS_APPEND,
  POSTS_REPLACE
} from '../../actions/actionTypes';

const ACTION_HANDLERS = {
  [ROUTE_HOME_STATE]: (state, action) => ({ ...state, ...action.payload }),
  [POSTS_PREPEND]: (state, action) => ({
    ...state,
    ...{ posts: [...action.payload.map(p => p.id), ...state.posts] }
  }),
  [POSTS_APPEND]: (state, action) => ({
    ...state,
    ...{ posts: [...state.posts, ...action.payload.map(p => p.id)] }
  }),
  [POSTS_REPLACE]: (state, action) => ({
    ...state,
    ...{ posts: [...action.payload.map(p => p.id)] }
  })
};

const initialState = {
  state: 'idle', // loading,idle,error
  error: null,
  url:  '/api/posts',
  nextUrl: null,
  posts: []
};

export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
