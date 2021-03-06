import axios from "axios";
// import { submit } from 'redux-form';
import {
  FETCH_USER,
  SUBMIT_REGISTRATION
} from "./types";
export * from './dataActions';
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitRegistration = (values) => async dispatch => {
  const res = await axios.post("/auth/register", values);
  dispatch({ type: SUBMIT_REGISTRATION, payload: res.data });
};

export const loginUser = (values, history) => async dispatch => {
  const res = await axios.post("/auth/login", values)
  dispatch({ type: FETCH_USER, payload: res.data });
  return res.data;
};
export const requestPasswordReset = (values) => async dispatch => {
  const res = await axios.post("/auth/requestPasswordReset", values);
  dispatch({ type: SUBMIT_REGISTRATION, payload: res.data });
};
export const validateAccount = (values) => async dispatch => {
  const res = await axios.post("/auth/validateAccount", values);
  dispatch({ type: SUBMIT_REGISTRATION, payload: res.data });
  return res.data;
};
export const resetPassword = (values) => async dispatch => {
  const res = await axios.post("/auth/resetPassword", values);
  dispatch(fetchUser());
  return res.data;
};

export const resetCheck = (values) => async dispatch => {
  const res = await axios.post("/auth/resetCheck", values);
  dispatch({ type: SUBMIT_REGISTRATION, payload: res.data });
  return res.data;
};