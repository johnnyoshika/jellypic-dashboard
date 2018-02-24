import { combineReducers } from 'redux'
import session from './sessionReducer'
import login from './loginReducer'

export default combineReducers({
  session,
  login
})
