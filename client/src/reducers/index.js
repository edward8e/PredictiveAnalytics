import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';
import mapReducer from './mapReducer';
import menuReducer from './menuReducer';
import modalReducer from './modalReducer';
import invoiceReducer from './invoiceReducer';
import contactReducer from './contactReducer';
import orderReducer from './orderReducer';
import cartReducer from './cartReducer';
import businessReducer from './businessReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    map: mapReducer,
    menu: menuReducer,
    modals: modalReducer,
    invoice: invoiceReducer,
    contact: contactReducer,
    order: orderReducer,
    cart: cartReducer,
    business: businessReducer
});