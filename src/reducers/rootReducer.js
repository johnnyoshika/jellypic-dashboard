import { combineReducers } from 'redux'
import routes from './routesReducer'
import uploader from './uploaderReducer'
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
  routes,
  uploader,
  toastr: toastrReducer
})

export default rootReducer