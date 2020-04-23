import React from "react";
import {
  Button,
  Card,
  CardBody,
  // CardFooter,
  // Col,
  // Row,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import renderInput from "../FormComponents/renderInput";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Password confirm is required")
});

const RegistrationForm = ({onSubmit}) => {

  return (
    <Card className="mx-4">
      <CardBody className="p-4">
        <Formik validationSchema={schema} onSubmit={onSubmit} initialValues={{
          firstName:'',
          lastName:'',
          email: '',
          password: '',
          passwordConfirm:''
        }}>
          {({ handleSubmit }) => <Form noValidate onSubmit={handleSubmit}>
            <h1>Register</h1>
            <p className="text-muted">Create your account</p>
            <Field
          name="firstName"
          type="text"
          label="First Name"
          icon="icon-user"
          component={renderInput}
        /><Field
          name="lastName"
          type="text"
          label="Last Name"
          icon="icon-user"
          component={renderInput}
        /><Field
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
         <Field
          name="passwordConfirm"
          type="password"
          label="Password Confirm"
          icon="icon-lock"
          component={renderInput}
        />
            <Button color="success" type="submit" block>
              Create Account
            </Button>
          </Form>
          }</Formik>
      </CardBody>
      {/*  <CardFooter className="p-4">
        <Row>
          <Col xs="12">
            <Button href='/auth/google' className="btn-google-plus mb-1" block>
              <span>Login with Google</span>
            </Button>
          </Col>
         <Col xs="12" sm="6">
            <Button className="btn-facebook mb-1" block>
              <span>Facebook</span>
            </Button>
          </Col>
        </Row>
      </CardFooter> */}
    </Card>
  );
}

export default RegistrationForm;
