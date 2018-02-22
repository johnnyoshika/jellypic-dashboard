import { combineReducers } from 'redux'
import session from './sessionReducer'
import login from './loginReducer'

const rootReducer = combineReducers({
  session,
  login
})

export default rootReducer