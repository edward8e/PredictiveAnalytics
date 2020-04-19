import {
  TOGGLE_UPDATE_MENU_ITEM_MODAL,
  TOGGLE_DELETE_MENU_ITEM_MODAL,
  TOGGLE_UPDATE_MENU_MODAL,
  TOGGLE_CREATE_CLIENT,
  TOGGLE_UPDATE_CLIENT
} from "../actions/types";

export default function(
  state = {
    updateMenuItem: false,
    updateMenu: false,
    deleteMenuItem: false,
    createClient: false,
    updateClient: false
  },
  action
) {
  switch (action.type) {
    case TOGGLE_UPDATE_MENU_ITEM_MODAL:
      return { ...state, updateMenuItem: action.payload };
    case TOGGLE_DELETE_MENU_ITEM_MODAL:
      return { ...state, deleteMenuItem: action.payload };
    case TOGGLE_UPDATE_MENU_MODAL:
      return { ...state, updateMenu: action.payload };
    case TOGGLE_CREATE_CLIENT:
      return { ...state, createClient: action.payload };
    case TOGGLE_UPDATE_CLIENT:
      return { ...state, updateClient: action.payload };
    default:
      return state;
  }
}
