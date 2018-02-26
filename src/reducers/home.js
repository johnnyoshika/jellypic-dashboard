import {
  ROUTE_HOME_STATE,
  ROUTE_HOME_PREPEND,
  ROUTE_HOME_APPEND
} from '../actions/actionTypes';

const ACTION_HANDLERS = {
  [ROUTE_HOME_STATE]: (state, action) => ({ ...state, ...action.payload }),
  [ROUTE_HOME_PREPEND]: (state, action) => ({
    ...state,
    ...{ posts: [...action.payload.ids, ...state.posts] }
  }),
  [ROUTE_HOME_APPEND]: (state, action) => ({
    ...state,
    ...{ posts: [...state.posts, ...action.payload.ids] }
  })
};

const initialState = {
  state: 'idle', // loading,idle,error
  error: null,
  nextUrl: '/api/posts',
  posts: []
};

export default function homeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
