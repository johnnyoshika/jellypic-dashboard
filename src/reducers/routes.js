import { combineReducers } from 'redux';
import session from './session';
import login from './login';

export default combineReducers({
  session,
  login
});
