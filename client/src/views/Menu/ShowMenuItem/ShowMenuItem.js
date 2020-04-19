import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItems } from "../../../actions";
import MenuItem from './MenuItem'

const CreateMenuItem = () => {
  const menu = useSelector(state => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const renderMenuItem = () => {
    return _.map(menu.menuItems, (menuItem) => {
      return <MenuItem key={menuItem._id} menuItem={menuItem} />
    })
  }

  return (
    <div>
      <h2>Menu Items</h2>
      <div>{renderMenuItem()}</div>
    </div>
  );
}

export default CreateMenuItem;
