import { SUBSCRIBER_STATE } from '../actions/actionTypes';

const ACTION_HANDLERS = {
  [SUBSCRIBER_STATE]: (state, action) => ({ ...state, ...action.payload })
};

const initialState = {
  state: 'idle', // idle,unavailable,available,subscribed,saving,error
  error: null
};
export default function subscriberReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
