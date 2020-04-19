import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SELECTED_DELIVERY_ADDRESS,
  CART_ADD_CATERING_INFO,
  PLACE_ORDER,
  FETCH_USER_ORDER,
  FETCH_PAST_USER_ORDER,
  ORDER_PAYMENT,
  CART_ERRORS
} from "./types";
export const cartAddItem = values => async dispatch => {
  dispatch({ type: CART_ADD_ITEM, payload: values });
};
export const cartRemoveItem = values => async dispatch => {
  dispatch({ type: CART_REMOVE_ITEM, payload: values });
};
export const selectedDeliveryAddress = values => async dispatch => {
  dispatch({ type: SELECTED_DELIVERY_ADDRESS, payload: values });
};
export const cartAddCateringInfo = values => async dispatch => {
  dispatch({ type: CART_ADD_CATERING_INFO, payload: values });
};
export const setCartError = values => async dispatch => {
  dispatch({ type: CART_ERRORS, payload: values });
};
export const placeOrder = (values) => async dispatch => {
  const res = await axios.post("/api/order", values);
  dispatch({ type: PLACE_ORDER, payload: res.data });
  return res.data;
};

export const fetchUserOrder = values => async dispatch => {
  const res = await axios.get("/api/order", values);
  dispatch({ type: FETCH_USER_ORDER, payload: res.data });
};
export const fetchPastUserOrder = values => async dispatch => {
  const res = await axios.get("/api/order/past", values);
  dispatch({ type: FETCH_PAST_USER_ORDER, payload: res.data });
};

export const orderPayment = values => async dispatch => {
  const res = await axios.post("/api/payment", values);
  dispatch({ type: ORDER_PAYMENT, payload: res.data });
  return res.data;
};