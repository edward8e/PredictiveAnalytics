import {UPDATE_COORDINATES, GET_CURRENT_LOCATION} from '../actions/types';

export default function(state = {}, action){
    switch (action.type){
        case UPDATE_COORDINATES:
            return {...state, coordinates: action.payload};
        case GET_CURRENT_LOCATION:
            return {...state, currentLocation: action.payload};
        default:
            return state;
    }
}