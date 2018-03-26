import { combineReducers } from 'redux';
import users from './users';
import likes from './likes';
import comments from './comments';
import posts from './posts';

export default combineReducers({
  users,
  likes,
  comments,
  posts
});
