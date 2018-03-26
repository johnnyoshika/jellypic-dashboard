import { combineReducers } from 'redux';
import login from './login';
import session from './session';
import home from './home';
import post from './post';
import userProfile from './userProfile';
import userPosts from './userPosts';

export default combineReducers({
  login,
  session,
  home,
  post,
  userProfile,
  userPosts
});
