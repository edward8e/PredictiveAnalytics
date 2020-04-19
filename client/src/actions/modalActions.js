
import {
  TOGGLE_UPDATE_MENU_ITEM_MODAL,
  TOGGLE_DELETE_MENU_ITEM_MODAL,
  TOGGLE_UPDATE_MENU_MODAL,
  TOGGLE_CREATE_CLIENT,
  TOGGLE_UPDATE_CLIENT
} from "./types";
export const toggleUpdateMenuItemModal = values => async dispatch => {
    dispatch({ type: TOGGLE_UPDATE_MENU_ITEM_MODAL, payload: values });
  };
  export const toggleDeleteMenuItemModal = values => async dispatch => {
    dispatch({ type: TOGGLE_DELETE_MENU_ITEM_MODAL, payload: values });
  };
  export const toggleUpdateMenuModal = values => async dispatch => {
    dispatch({ type: TOGGLE_UPDATE_MENU_MODAL, payload: values });
  };
  export const toggleCreateClientModal = values => async dispatch => {
    dispatch({ type: TOGGLE_CREATE_CLIENT, payload: values });
  };
  export const toggleUpdateClientModal = values => async dispatch => {
    dispatch({ type: TOGGLE_UPDATE_CLIENT, payload: values });
  };