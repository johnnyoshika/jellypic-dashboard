import { SERVICE_WORKER_STATE } from '../actions/actionTypes';

const ACTION_HANDLERS = {
  [SERVICE_WORKER_STATE]: (state, action) => ({ ...state, ...action.payload })
};

const initialState = {
  state: 'fresh' // fresh,stale,activating
};

export default function refreshReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
