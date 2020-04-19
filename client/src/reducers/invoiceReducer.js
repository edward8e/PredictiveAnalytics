import {
    GENERATE_INVOICE
  } from "../actions/types";
  
  export default function(state = {}, action) {
    switch (action.type) {
      case GENERATE_INVOICE:
        return state;
      default:
        return state;
    }
  }
  