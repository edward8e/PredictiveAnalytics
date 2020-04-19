import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryItem from './CategoryItem';
import { fetchCategory } from "../../../actions";

const ShowCategory = () => {
  const categories = useSelector(state => state.menu.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const renderCategory = () => {
    return _.map(categories, (category) => {
      return <CategoryItem key={category._id} category={category} />
    })
  }

  return (
    <div>
      <h2>Categories</h2>
      {renderCategory()}
    </div>
  );
}

export default ShowCategory;
