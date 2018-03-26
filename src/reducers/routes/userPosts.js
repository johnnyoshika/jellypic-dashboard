import {
  ROUTE_USER_POSTS_STATE,
  USER_POSTS_PREPEND,
  USER_POSTS_APPEND,
  USER_POSTS_REPLACE
} from '../../actions/actionTypes';

const ACTION_HANDLERS = {
  [ROUTE_USER_POSTS_STATE]: (state, action) => ({
    ...state,
    ...action.payload
  }),
  [USER_POSTS_PREPEND]: (state, action) => ({
    ...state,
    ...{
      posts: [
        ...action.payload.map(p => p.id),
        ...state.posts
      ]
    }
  }),
  [USER_POSTS_APPEND]: (state, action) => ({
    ...state,
    ...{
      posts: [
        ...state.posts,
        ...action.payload.map(p => p.id)
      ]
    }
  }),
  [USER_POSTS_REPLACE]: (state, action) => ({
    ...state,
    ...{
      posts: [...action.payload.map(p => p.id)]
    }
  })
};

const initialState = {
  id: null,
  state: 'idle', // refreshing,loading,idle,error
  error: null,
  nextUrl: null,
  posts: []
};

export default function userPostsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
