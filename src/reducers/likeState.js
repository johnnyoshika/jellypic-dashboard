import { LIKE_STATE } from '../actions/actionTypes';

const ACTION_HANDLERS = {
  [LIKE_STATE]: (state, action) => ({ ...state, ...action.payload })
};

const initialState = {};
export default function likeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
