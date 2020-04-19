import React from "react";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import renderInput from "../FormComponents/renderInput";

const schema = yup.object({
    businessName: yup.string().required(),
    email: yup.string().required().email()
});

const LoginForm = ({ onSubmit }) => {
    return (
        <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
            businessName: '',
            email: ''
        }}>
            {({ handleSubmit }) => <Form noValidate onSubmit={handleSubmit}>
                <h1>Business Name</h1>
                <Field
                    name="businessName"
                    type="text"
                    label="Business Name"
                    icon="icon-people"
                    component={renderInput}
                />
                <Field
                    name="email"
                    type="text"
                    label="Business email"
                    icon="icon-envelope"
                    component={renderInput}
                />
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
            </Form>}
        </Formik>
    );
}

export default LoginForm;
