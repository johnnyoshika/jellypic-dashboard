import { ROUTE_POST_STATE } from '../actions/actionTypes';

const ACTION_HANDLERS = {
  [ROUTE_POST_STATE]: (state, action) => ({ ...state, ...action.payload })
};

const initialState = {
  state: 'idle', // loading,idle,error,success
  error: null
};
export default function postReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
