import { combineReducers } from 'redux'
import routes from './routes'
import uploader from './uploader'
import { reducer as toastrReducer } from 'react-redux-toastr'

export default combineReducers({
  routes,
  uploader,
  toastr: toastrReducer
})
