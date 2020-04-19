import axios from "axios";
import {
  FETCH_MENU_ITEMS,
  SELECTED_MENU_ITEM,
  CREATE_MENU,
  FETCH_MENUS,
  SELECTED_MENU,
  SELECTED_ORDER_ITEM,
  SELECTED_ORDER,
  FETCH_CATEGORY,
  FETCH_NEW_ORDERS,
  FETCH_CURRENT_ORDERS,
  FETCH_PAST_ORDERS
} from "./types";

  export const fetchMenuItems = values => async dispatch => {
    const res = await axios.get("/api/menu/item", values);
    dispatch({ type: FETCH_MENU_ITEMS, payload: res.data });
  };
  export const submitMenuItem = (values) => async dispatch => {
    await axios.post("/api/menu/item", values);
    dispatch(fetchMenuItems());
  };
  export const deleteMenuItem = values => async dispatch => {
    await axios.post("/api/menu/item/delete", values);
    dispatch(fetchMenuItems());
  };
  export const toggleMenuItem = values => async dispatch => {
    await axios.post("/api/menu/item/toggle", values);
    dispatch(fetchMenuItems());
  };
  export const selectedMenuItem = values => async dispatch => {
    dispatch({ type: SELECTED_MENU_ITEM, payload: values[0] });
  };
  export const updateMenuItem = values => async dispatch => {
    await axios.post("/api/menu/item/update", values);
    dispatch(fetchMenuItems());
  };
  export const submitMenu = (values, history) => async dispatch => {
    const res = await axios.post("/api/menu", values);
    history.push("/dashboard/menu/show");
    dispatch({ type: CREATE_MENU, payload: res.data });
  };
  export const fetchMenus = values => async dispatch => {
    const res = await axios.get("/api/menu", values);
    dispatch({ type: FETCH_MENUS, payload: res.data });
  };
  export const deleteMenu = values => async dispatch => {
    const res = await axios.post("/api/menu/delete", values);
    dispatch({ type: FETCH_MENUS, payload: res.data });
  };
  export const selectedMenu = values => async dispatch => {
    dispatch({ type: SELECTED_MENU, payload: values[0] });
  };
  export const updateMenu = values => async dispatch => {
    const res = await axios.post("/api/menu/update", values);
    dispatch({ type: FETCH_MENUS, payload: res.data });
  };
  export const selectedOrderItem = values => async dispatch => {
    dispatch({ type: SELECTED_ORDER_ITEM, payload: values });
  };
  export const selectedOrder = values => async dispatch => {
    dispatch({ type: SELECTED_ORDER, payload: values });
  };
  export const fetchCategory = values => async dispatch => {
    const res = await axios.get("/api/menu/category");
    dispatch({ type: FETCH_CATEGORY, payload: res.data });
  };
  export const submitCategory = values => async dispatch => {
    await axios.post("/api/menu/category", values);
    dispatch(fetchCategory());
  };
  export const updateCategory = (values) => async dispatch => {
    await axios.post("/api/menu/category/update", values);
    dispatch(fetchCategory());
  };
  export const deleteCategory = (values) => async dispatch => {
    await axios.post("/api/menu/category/delete", values);
    dispatch(fetchCategory());
  };
  export const fetchNewOrders = (values) => async dispatch => {
    const res = await axios.get("/api/newOrders");
    dispatch({ type: FETCH_NEW_ORDERS, payload: res.data });
  };
  export const fetchCurrentOrders = (values) => async dispatch => {
    const res = await axios.get("/api/currentOrders");
    dispatch({ type: FETCH_CURRENT_ORDERS, payload: res.data });
  };
  export const fetchPastOrders = (values) => async dispatch => {
    const res = await axios.get("/api/pastOrders");
    dispatch({ type: FETCH_PAST_ORDERS, payload: res.data });
  };
  export const approveOrder = (values) => async dispatch => {
    await axios.post("/api/order/approve", values);
    dispatch(fetchNewOrders());
  };
  export const forceComplete = (values) => async dispatch => {
    await axios.post("/api/order/complete", values);
    dispatch(fetchCurrentOrders());
  };

  export const cancelOrder = (values) => async dispatch => {
    await axios.post("/api/order/cancel", values);
    dispatch(fetchCurrentOrders());
  };