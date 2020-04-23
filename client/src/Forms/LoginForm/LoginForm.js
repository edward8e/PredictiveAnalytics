import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import renderInput from "../FormComponents/renderInput";

const schema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup.string().required().email()
});

const LoginForm = ({onSubmit}) => {
  return (
    <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
      email: '',
      password: ''
    }}>
      {({ handleSubmit }) => <Form noValidate onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p className="text-muted">Sign In to your account</p>
        <Field
          name="email"
          type="email"
          label="Email"
          icon="icon-envelope"
          component={renderInput}
        />
        <Field
          name="password"
          type="password"
          label="Password"
          icon="icon-lock"
          component={renderInput}
        />
        <Row>
          <Col xs="6">
            <Button color="primary" className="px-4">
              Login
          </Button>
          </Col>
          <Col xs="6" className="text-right">
            <Button color="link" className="px-0">
              <Link to="/forgotPassword">Forgot password?</Link>
            </Button>
          </Col>
        </Row>
      </Form>}
    </Formik>
  );
}

export default LoginForm;
