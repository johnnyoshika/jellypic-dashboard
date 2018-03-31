import { combineReducers } from 'redux';
import home from './home';
import userProfile from './userProfile';
import userPosts from './userPosts';

export default combineReducers({
  home,
  userProfile,
  userPosts
});
