import '../../Plugins/Spinners/Spinners.scss';
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import { Row, Col, Card, CardBody, CardGroup, Container } from "reactstrap";
import { validateAccount } from '../../../actions';

const ValidateAccount = ({ match: { params } }) => {

  const [valid, setValid] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async function initalize() {
      console.log(params)
      const res = await dispatch(validateAccount(params));
      if (res.status) {
        console.log("validated!")
        setValid(true);
        setTimeout(() => { history.push('/login'); }, 4000);
      } else {
        console.log("not valid")
        setValid(false);
      }
    })()
  }, [dispatch, params])

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody style={{ textAlign: "center" }}>
                  {valid ? <><h3>Account Validated</h3>
                    <p className="text-muted">Redirecting to Login Screen...</p>
                    <div className="sk-circle">
                      <div className="sk-circle1 sk-child"></div>
                      <div className="sk-circle2 sk-child"></div>
                      <div className="sk-circle3 sk-child"></div>
                      <div className="sk-circle4 sk-child"></div>
                      <div className="sk-circle5 sk-child"></div>
                      <div className="sk-circle6 sk-child"></div>
                      <div className="sk-circle7 sk-child"></div>
                      <div className="sk-circle8 sk-child"></div>
                      <div className="sk-circle9 sk-child"></div>
                      <div className="sk-circle10 sk-child"></div>
                      <div className="sk-circle11 sk-child"></div>
                      <div className="sk-circle12 sk-child"></div>
                    </div></> : valid === null ? <div className="sk-circle">
                      <div className="sk-circle1 sk-child"></div>
                      <div className="sk-circle2 sk-child"></div>
                      <div className="sk-circle3 sk-child"></div>
                      <div className="sk-circle4 sk-child"></div>
                      <div className="sk-circle5 sk-child"></div>
                      <div className="sk-circle6 sk-child"></div>
                      <div className="sk-circle7 sk-child"></div>
                      <div className="sk-circle8 sk-child"></div>
                      <div className="sk-circle9 sk-child"></div>
                      <div className="sk-circle10 sk-child"></div>
                      <div className="sk-circle11 sk-child"></div>
                      <div className="sk-circle12 sk-child"></div>
                    </div> : <><h3>Validation Error</h3>
                    <p className="text-muted">Please try to register again or request validation email...</p></>}
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ValidateAccount;
