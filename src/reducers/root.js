import { combineReducers } from 'redux';
import entities from './entities';
import routes from './routes';
import likeState from './likeState';
import uploader from './uploader';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  entities,
  routes,
  likeState,
  uploader,
  toastr: toastrReducer
});
