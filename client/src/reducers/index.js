import { combineReducers } from 'redux';
import authReducer from './authReducer';
import analyticReducer from './analyticReducer';

export default combineReducers({
    auth: authReducer,
    analytics: analyticReducer
});