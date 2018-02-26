import { combineReducers } from 'redux';
import login from './login';
import session from './session';
import home from './home';

export default combineReducers({
  login,
  session,
  home
});
