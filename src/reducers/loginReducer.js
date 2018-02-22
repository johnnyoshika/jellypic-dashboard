import { CHANGE_LOGIN_STATE } from '../actions/actionTypes'

const ACTION_HANDLERS = {
  [CHANGE_LOGIN_STATE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  state: 'idle', // idle,processing,ready,success,error
  error: null
}

export default function loginReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
