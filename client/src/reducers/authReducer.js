import { FETCH_USER, SUBMIT_REGISTRATION } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        case SUBMIT_REGISTRATION:
            return state;
        default:
            return state;
    }
}