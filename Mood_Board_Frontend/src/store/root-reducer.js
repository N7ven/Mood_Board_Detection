import { combineReducers } from 'redux';
import authReducer from './auth/auth-reducer';

const reducers = combineReducers({
  auth: authReducer
});

export default reducers;
