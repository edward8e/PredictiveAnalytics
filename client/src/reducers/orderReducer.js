import {
    SELECTED_ORDER_ITEM,
    FETCH_USER_ORDER,
    SELECTED_ORDER,
    FETCH_PAST_USER_ORDER,
    ORDER_PAYMENT,
    FETCH_NEW_ORDERS,
    FETCH_CURRENT_ORDERS,
    FETCH_PAST_ORDERS
  } from "../actions/types";
  
  export default function(state = {userOrders:[], pastUserOrders:[], newOrders:[], currentOrders:[], pastOrders:[]}, action) {
    switch (action.type) {
      case ORDER_PAYMENT:
        return { ...state};
      case SELECTED_ORDER_ITEM:
        return { ...state, selectedOrderItem: action.payload };
      case SELECTED_ORDER:
        return { ...state, selectedOrder: action.payload };
      case FETCH_USER_ORDER:
        return {...state, userOrders: action.payload};
      case FETCH_PAST_USER_ORDER:
        return {...state, pastUserOrders: action.payload}
      case FETCH_NEW_ORDERS:
        return {...state, newOrders: action.payload};
      case FETCH_CURRENT_ORDERS:
        return {...state, currentOrders: action.payload};
      case FETCH_PAST_ORDERS:
        return {...state, pastOrders: action.payload};
      default:
        return state;
    }
  }
  