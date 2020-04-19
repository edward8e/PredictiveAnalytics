import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from "reactstrap";
import { submitRegistration } from "../../../actions";
import RegistrationForm from "../../Forms/RegistrationForm/RegistrationForm";
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async formValues => {
    try {
      await dispatch(submitRegistration(formValues));
      toast.info("Email Confirmation sent!");
      setTimeout(() => { history.push('/login'); }, 4000);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const containerStyle = {
    zIndex: 1999
  };
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <RegistrationForm onSubmit={onSubmit} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}


export default Register;
