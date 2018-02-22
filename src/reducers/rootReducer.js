import { combineReducers } from 'redux'
import session from './sessionReducer'
import login from './loginReducer'
import uploader from './uploaderReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  session,
  login,
  uploader,
  toastr: toastrReducer
})

export default rootReducer