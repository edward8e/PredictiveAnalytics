import React from "react";
import { Row, Col, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import renderInput from "../FormComponents/renderInput";

const schema = yup.object({
  email: yup.string().required().email()
});

const PasswordResetRequestForm = ({onSubmit}) => {
  return (
    <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
      email: ''
    }}>
      {({ handleSubmit }) => <Form noValidate onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <p className="text-muted">Enter your email address below and we'll send you a link to reset your password.</p>
        <Field
          name="email"
          type="email"
          label="Email"
          icon="icon-envelope"
          component={renderInput}
        />
        <Row>
          <Col xs="6">
            <Button color="primary" className="px-4">
              Reset Password
          </Button>
          </Col>
        </Row>
      </Form>}
    </Formik>
  );
}

export default PasswordResetRequestForm;
