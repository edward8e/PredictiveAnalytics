import {
  CREATE_CLIENT,
  FETCH_CLIENTS,
  SELECTED_CLIENT,
  CREATE_CONTACT,
  FETCH_CONTACTS,
  SELECTED_CONTACT
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_CLIENT:
      return state;
    case FETCH_CLIENTS:
      return { ...state, clients: action.payload };
    case SELECTED_CLIENT:
      return { ...state, selectedClient: action.payload };
    case CREATE_CONTACT:
      return state;
    case FETCH_CONTACTS:
      return { ...state, contacts: action.payload };
    case SELECTED_CONTACT:
      return { ...state, selectedContacts: action.payload };
    default:
      return state;
  }
}
