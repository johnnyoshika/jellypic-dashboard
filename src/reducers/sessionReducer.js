import { ROUTE_SESSION_STATE } from '../actions/actionTypes'

const ACTION_HANDLERS = {
  [ROUTE_SESSION_STATE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  state: 'anonymous', // checking,anonymous,authenticated,error
  error: null,
  user: null
}

export default function sessionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}