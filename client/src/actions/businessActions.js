import axios from "axios";
import {
  FETCH_BUSINESS
} from "./types";

export const fetchBusiness = (values) => async dispatch => {
  const res = await axios.get("/api/fetchBusiness", values);
  dispatch({ type: FETCH_BUSINESS, payload: res.data });
};
export const createBusiness = (values) => async dispatch => {
  await axios.post("/api/createBusiness", values);
  dispatch(fetchBusiness());
};
export const saveSettings = (values) => async dispatch => {
  await axios.post("/api/settings", values);
  dispatch(fetchBusiness());
};
