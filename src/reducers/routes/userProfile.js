import { ROUTE_USER_PROFILE_STATE } from '../../actions/actionTypes';

const ACTION_HANDLERS = {
  [ROUTE_USER_PROFILE_STATE]: (state, action) => ({ ...state, ...action.payload })
};

const initialState = {
  id: null,
  state: 'idle', // loading,idle,error,success
  error: null
};

export default function userProfileReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
