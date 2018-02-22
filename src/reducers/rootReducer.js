import { combineReducers } from 'redux'
import session from './sessionReducer'
import login from './loginReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  session,
  login,
  toastr: toastrReducer
})

export default rootReducer