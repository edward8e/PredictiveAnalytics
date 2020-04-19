import {
  CREATE_MENU_ITEM,
  FETCH_MENU_ITEMS,
  SELECTED_MENU_ITEM,
  CREATE_MENU,
  FETCH_MENUS,
  SELECTED_MENU,
  FETCH_CATEGORY
} from "../actions/types";

export default function(state = {categories:[]}, action) {
  switch (action.type) {
    case CREATE_MENU_ITEM:
      return state;
    case FETCH_MENU_ITEMS:
      return { ...state, menuItems: action.payload };
    case FETCH_CATEGORY:
      return { ...state, categories: action.payload };
    case SELECTED_MENU_ITEM:
      return { ...state, selectedMenuItem: action.payload };
    case CREATE_MENU:
      return state;
    case FETCH_MENUS:
      return { ...state, menus: action.payload };
    case SELECTED_MENU:
      return { ...state, selectedMenu: action.payload };
    default:
      return state;
  }
}
