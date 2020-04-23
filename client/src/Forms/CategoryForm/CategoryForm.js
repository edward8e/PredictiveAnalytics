import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Form, Formik, Field } from "formik";
import { Button } from "reactstrap";
import * as yup from "yup";
import { submitCategory, updateCategory } from '../../../actions';
import renderInput from '../FormComponents/renderInput';

const schema = yup.object({
    categoryName: yup.string().required(),
    description: yup.string().required(),
});

const CategoryForm = ({ formType, toggle, initialValues }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = async formValues => {
        if (formType === "new") {
            await dispatch(submitCategory(formValues));
        }
        if (formType === "update") {
            await dispatch(updateCategory({ ...formValues, ...{ _id: initialValues._id } }));
        }
        if (toggle) {
            toggle()
        }
        history.push('/dashboard/category')
        console.log("submitted");
    };
    return <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
        categoryName: initialValues == null ? '' : initialValues.categoryName,
        description: initialValues == null ? '' : initialValues.description
    }}>
        {({ handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Field
                    name="categoryName"
                    type="text"
                    label="Catergory Name"
                    component={renderInput}
                />
                <Field
                    name="description"
                    type="textarea"
                    label="Description"
                    rows="9"
                    component={renderInput}
                />
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
            </Form>
        )}
    </Formik>
}

export default CategoryForm;