import axios from "axios";
import {
  CREATE_CLIENT,
  FETCH_CLIENTS,
  SELECTED_CLIENT,
  CREATE_CONTACT,
  FETCH_CONTACTS,
  SELECTED_CONTACT
} from "../actions/types";

//Client
export const submitClient = (values, history) => async dispatch => {
  const res = await axios.post("/api/client", values);
  history.push("/dashboard/contact");
  dispatch({ type: CREATE_CLIENT, payload: res.data });
};
export const fetchClients = values => async dispatch => {
  const res = await axios.get("/api/client", values);
  dispatch({ type: FETCH_CLIENTS, payload: res.data });
};
export const deleteClient = values => async dispatch => {
  const res = await axios.post("/api/client/delete", values);
  dispatch({ type: FETCH_CLIENTS, payload: res.data });
};
export const selectedClient = values => async dispatch => {
  dispatch({ type: SELECTED_CLIENT, payload: values[0] });
};
export const updateClient = values => async dispatch => {
  const res = await axios.post("/api/client/update", values);
  dispatch({ type: FETCH_CLIENTS, payload: res.data });
};
//Contact
export const submitContact = (values, history) => async dispatch => {
    const res = await axios.post("/api/contact", values);
    history.push("/dashboard/contact");
    dispatch({ type: CREATE_CONTACT, payload: res.data });
  };
  export const fetchContact = values => async dispatch => {
    const res = await axios.get("/api/contact", values);
    dispatch({ type: FETCH_CONTACTS, payload: res.data });
  };
  export const deleteContact = values => async dispatch => {
    const res = await axios.post("/api/contact/delete", values);
    dispatch({ type: FETCH_CONTACTS, payload: res.data });
  };
  export const selectedContact = values => async dispatch => {
    dispatch({ type: SELECTED_CONTACT, payload: values[0] });
  };
  export const updateContact = values => async dispatch => {
    const res = await axios.post("/api/contact/update", values);
    dispatch({ type: FETCH_CONTACTS, payload: res.data });
  };