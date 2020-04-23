import React from "react";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import renderInput from "../FormComponents/renderInput";

const schema = yup.object({
    password: yup.string().required("Password is required"),
    passwordConfirm: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Password confirm is required")
});

const PasswordResetForm = ({ onSubmit }) => {
    return (
        <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
            passwordConfirm: '',
            password: ''}}>
            {({ handleSubmit, handleChange, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Field
                        name="password"
                        type="password"
                        label="Password"
                        icon="icon-lock"
                        component={renderInput}
                    />
                    <Field
                        name="passwordConfirm"
                        type="password"
                        label="Password Confirm"
                        icon="icon-lock"
                        component={renderInput}
                    />
                    <Button color="primary" className="px-4">
                        Reset Password
          </Button>
                </Form>
            )}
        </Formik>
    );
}

export default PasswordResetForm;
