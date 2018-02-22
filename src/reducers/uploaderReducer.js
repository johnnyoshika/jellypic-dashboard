import { UPLOADER_STATE } from '../actions/actionTypes'

const ACTION_HANDLERS = {
  [UPLOADER_STATE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  state: 'idle', // idle,saving,error
  error: null
}

export default function uploadReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
