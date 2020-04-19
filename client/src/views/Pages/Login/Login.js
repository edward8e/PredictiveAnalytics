import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Button, Card, CardBody, CardGroup, Col, Container, Row } from "reactstrap";
import { loginUser } from "../../../actions";
import LoginForm from "../../Forms/LoginForm/LoginForm";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async formValues => {
    try {
      await dispatch(loginUser(formValues));
      if (auth.accountType === "admin") {
        history.push("/dashboard");
      } else {
        history.push("/");
      }
    } catch (e) {
      toast.error(e.response.data);
    }
  };

  const containerStyle = {
    zIndex: 1999
  };
  const isTabletOrMobile = useMediaQuery({ maxWidth: 960 });
  return (
    <div className="app flex-row align-items-center">
      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <LoginForm onSubmit={onSubmit} />

                </CardBody>
                {isTabletOrMobile && <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <p className="text-muted" style={{margin:0, marginRight:"10px"}}>Register Now!</p>
                  <Link to="/register">
                    <Button
                      color="primary"
                      active
                      tabIndex={-1}
                    >
                      Register Now!
                        </Button>
                  </Link></div>


                }
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <div>Welcome to CateredPRO</div>
                    <div>by Saboree Catering</div>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                        </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );

}

export default withRouter(Login);
