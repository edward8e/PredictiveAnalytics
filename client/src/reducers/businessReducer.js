import {FETCH_BUSINESS
  } from "../actions/types";
  
  export default function(state = { settings: {} }, action) {
    switch (action.type) {
      case FETCH_BUSINESS:
        return { ...action.payload };
      default:
        return state;
    }
  }
  