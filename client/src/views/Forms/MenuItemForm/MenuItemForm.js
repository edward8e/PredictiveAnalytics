import _ from "lodash";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Form, Formik, Field } from "formik";
import { Button } from "reactstrap";
import * as yup from "yup";
import { fetchCategory, submitMenuItem, updateMenuItem } from '../../../actions';
import renderInput from '../FormComponents/renderInput';

const schema = yup.object({
  itemName: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  category: yup.string().required()
});

const MenuItemForm = ({ formType, toggle, initialValues }) => {
  const menu = useSelector(state => state.menu);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const onSubmit = async formValues => {
    if (formType === "new") {
      await dispatch(submitMenuItem(formValues));
    }

    if (formType === "update") {
      await dispatch(updateMenuItem({ ...formValues, ...{ _id: initialValues._id } }))
    }
    if (toggle) {
      toggle()
    }
    history.push('/dashboard/menu');
    console.log("submitted");
  };
  return <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
    itemName: initialValues == null ? '' : initialValues.itemName,
    description: initialValues == null ? '' : initialValues.description,
    price: initialValues == null ? '' : initialValues.price,
    category: initialValues == null ? '' : initialValues.category._id
  }}>
    {({ handleSubmit, handleChange, values, errors }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Field
          name="itemName"
          type="text"
          label="Example: Chicken Enchiladas"
          component={renderInput}
        />
        <Field
          name="description"
          type="textarea"
          rows="3"
          label="Example: Rolled tortillas with green enchilada..."
          component={renderInput}
        />
        <Field
          name="price"
          type="number"
          label="5.99"
          component={renderInput}
        />
        <Field
          name="category"
          type="select"
          label="Select Category"
          component={renderInput}
          options={_.map(menu.categories, ({ categoryName, _id }) => {
            return { value: _id, label: categoryName }
          })}
        />
        <Button type="submit">Submit form</Button>
      </Form>
    )}
  </Formik>
}

export default MenuItemForm;