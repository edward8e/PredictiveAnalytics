import axios from "axios";
import { submit } from 'redux-form';
import {
  FETCH_USER,
  FETCH_SURVEYS,
  SUBMIT_REGISTRATION,
  GENERATE_INVOICE
} from "./types";
export * from './menuActions';
export * from './contactActions';
export * from './modalActions';
export * from './cartActions';
export * from './businessActions';

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
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
export const submitForm = values => async dispatch => {
  dispatch(submit(values));
};
export const generateInvoice = (values, history) => async dispatch => {
  const res = await axios.post("/api/invoice", values);
  // history.push("/dashboard/menu");
  dispatch({ type: GENERATE_INVOICE, payload: res.data });
};
export const requestPasswordReset = (values) => async dispatch => {
  const res = await axios.post("/auth/requestPasswordReset", values);
  dispatch({ type: SUBMIT_REGISTRATION, payload: res.data });
};
export const resetCheck = (values) => async dispatch => {
  const res = await axios.post("/auth/resetCheck", values);
  dispatch({ type: SUBMIT_REGISTRATION, payload: res.data });
  return res.data;
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
export const redoPayment = (values) => async dispatch => {
  const res = await axios.post("/api/redoPayment", values);
  dispatch({ type: SUBMIT_REGISTRATION, payload: res.data });
  return res.data;
};

