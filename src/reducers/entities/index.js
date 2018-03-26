import { combineReducers } from 'redux';
import users from './users';
import profiles from './profiles';
import likes from './likes';
import comments from './comments';
import posts from './posts';

export default combineReducers({
  users,
  profiles,
  likes,
  comments,
  posts
});
