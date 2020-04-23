import axios from "axios";
import {
    FETCH_ANALYTICS,
    SELECTED_DATA,
    SELECTED_PROCESSED_DATA
} from "./types";

export const fetchAnalytics = () => async dispatch => {
    const res = await axios.get("/api/analytic");
    dispatch({ type: FETCH_ANALYTICS, payload: res.data });
};
export const fetchSelectedData = values => async dispatch => {
    const res = await axios.post("/api/itemInfo", values);
    dispatch({ type: SELECTED_DATA, payload: res.data });
};
export const SelectedAnalyticData = values => async dispatch => {
    dispatch({ type: SELECTED_PROCESSED_DATA, payload: values });
};
