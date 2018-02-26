import { combineReducers } from 'redux';
import entities from './entities';
import routes from './routes';
import likeState from './likeState';
import commentState from './commentState';
import uploader from './uploader';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({
  entities,
  routes,
  likeState,
  commentState,
  uploader,
  toastr: toastrReducer
});
