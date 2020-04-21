import {
  FETCH_ANALYTICS
} from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ANALYTICS:
      return [ ...state, ...action.payload ];
    default:
      return state;
  }
}
