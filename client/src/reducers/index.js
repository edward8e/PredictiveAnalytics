import { combineReducers } from 'redux';
import authReducer from './authReducer';
import analyticReducer from './analyticReducer';
import selectedDataReducer from './selectedDataReducer';

export default combineReducers({
    auth: authReducer,
    analytics: analyticReducer,
    selectedData: selectedDataReducer
});