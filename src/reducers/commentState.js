import { COMMENT_STATE } from '../actions/actionTypes';

const ACTION_HANDLERS = {
  [COMMENT_STATE]: (state, action) => ({ ...state, ...action.payload })
};

const initialState = {};
export default function commentReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
