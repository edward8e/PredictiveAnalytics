import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col, CardBody, CardGroup, Container, Spinner } from "reactstrap";
import { resetCheck, resetPassword } from "../../../actions";
import PasswordResetForm from '../../Forms/PasswordResetForm/PasswordResetForm';

const PasswordReset = ({ match: { params } }) => {
  const [userID, setUserID] = useState(null);
  const [resetValid, setResetValid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function Fetch() {
      const res = await dispatch(resetCheck(params));
      setResetValid(res.status);
      if (res.status) {
        setUserID(res.userID);
      }
    })();
  }, [dispatch,params])


  const onSubmit = async formValues => {
    const submitdata = { ...formValues, ...{ userID } }
    await dispatch(resetPassword(submitdata));
    console.log("submitted");
    window.location = '/login';
  };

  return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {resetValid == null && <Spinner animation="grow" />}
                    {resetValid === false && <>
                      <h1>Problem resetting password.</h1>
                      <p className="text-muted"> Link might have expired. Please send another reset link.</p></>}
                    {resetValid && <><h1>Password Reset</h1>
                      <p className="text-muted">Please provide your new password twice.</p>
                      <p className="text-muted">After your password has been reset you will be re-directed to the login page.</p>
                      <PasswordResetForm onSubmit={onSubmit} /></>}
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default PasswordReset;
