import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "reactstrap";
import { requestPasswordReset } from '../../../actions';
import { Formik, Form, Field } from "formik";
import renderInput from '../../Forms/FormComponents/renderInput';
import ResetPasswordModal from '../../../components/Modals/ResetPasswordModal';
import * as yup from "yup";

const schema = yup.object({
});

const AccountInfo = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const onSubmit = async () => {
    await dispatch(requestPasswordReset({ email: auth.email }))
    window.location = '/api/logout';
  }

  const { firstName, lastName, email, phone } = auth;
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "flex",
        //   justifyContent: "center",
        //   alignItems:"center",
        flexDirection: "column",
        padding: "0px 50px 50px 50px"
      }}
    ><Container>
      <ResetPasswordModal onSubmit={onSubmit} toggle={toggle} onToggle={()=>setToggle(!toggle)}/>
      <h2>My Details</h2>
      <div
        style={{
          borderBottom: "2px solid gray",
          width: "100%",
          marginBottom: "30px"
        }}
      >
        <h4>Personal Information</h4>
      </div>
      <Formik validationSchema={schema} onSubmit={() => { console.log("submitted") }} initialValues={{
        firstName,
        lastName,
        email,
        password: "***********",
        phone
      }}>
        {({ handleSubmit }) => <Form noValidate onSubmit={handleSubmit}>
          <Field
            name="firstName"
            disabled
            type="text"
            label="First Name"
            icon="icon-user"
            component={renderInput}
          />
          <Field
            disabled
            name="lastName"
            type="text"
            label="Last Name"
            icon="icon-user"
            component={renderInput}
          />
          <Field
            disabled
            name="email"
            type="email"
            label="Email"
            icon="icon-envelope"
            component={renderInput}
          />
          <Field
            disabled
            value="**********"
            name="password"
            type="password"
            label="Password"
            icon="icon-lock"
            component={renderInput}
          />
          <Button block size="lg" className="mb-3" color="primary" onClick={()=>setToggle(true)}>ResetPassword</Button>
          <Field
            disabled
            name="phone"
            type="phone"
            label="Phone"
            icon="icon-phone"
            component={renderInput}
          />
          </Form>}</Formik>
          </Container>
    </div>
  );
}
export default AccountInfo;
