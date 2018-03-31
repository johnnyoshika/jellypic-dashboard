import { combineReducers } from 'redux';
import login from './login';
import home from './home';
import userProfile from './userProfile';
import userPosts from './userPosts';

export default combineReducers({
  login,
  home,
  userProfile,
  userPosts
});
