import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SELECTED_DELIVERY_ADDRESS,
  CART_ADD_CATERING_INFO,
  PLACE_ORDER,
  CART_ERRORS
} from "../actions/types";

export default function(state = { items: [], address:{}, info:{}, error: {valid: false, message:null} }, action) {
  switch (action.type) {
    case PLACE_ORDER:
      return state;
    case CART_ADD_ITEM:
      return { ...state, items: [...state.items, { ...action.payload }] };
    case CART_ADD_CATERING_INFO:
      return { ...state, info: action.payload };
    case CART_REMOVE_ITEM:
      return {...state,items: state.items.filter(item => item !== state.items[action.payload])};
    case SELECTED_DELIVERY_ADDRESS:
      return { ...state, address: action.payload };
    case CART_ERRORS:
      return { ...state, error: action.payload}
    default:
      return state;
  }
}
