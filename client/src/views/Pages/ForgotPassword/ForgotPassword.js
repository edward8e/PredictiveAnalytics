import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Card, CardBody,CardGroup, Container} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import { requestPasswordReset } from '../../../actions';
import PasswordResetRequestForm from '../../Forms/PasswordResetRequestForm/PasswordResetRequestForm';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const onSubmit = async (formValues) => {
    try{
    await dispatch(requestPasswordReset(formValues));
    window.location = '/login';
  } catch (e) {
    toast.error(e.response.data);
  }
  }
  const containerStyle = {
    zIndex: 1999
  };

  return (
    <div className="app flex-row align-items-center">
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <PasswordResetRequestForm onSubmit={onSubmit}/>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ForgotPassword;
