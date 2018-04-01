import { combineReducers } from 'redux';
import userProfile from './userProfile';
import userPosts from './userPosts';

export default combineReducers({
  userProfile,
  userPosts
});
