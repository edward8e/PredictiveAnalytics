import _ from "lodash";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { MdArrowBack } from "react-icons/md";
import { selectedOrder } from "../../../actions";
import { getDate, formatMoney, formatAMPM, jsUcfirst } from "../../../utils";
import { Row, Col, Table, Badge, Button, Container } from "reactstrap";

const OrderDetail = () => {
  const [hover, setHover] = useState(false);
  const order = useSelector(state => state.order);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const renderStatus = () => {
    const { status } = order.selectedOrder;
    switch (status) {
      case "pending":
        return <Badge style={{ fontSize: "1.2rem" }} color="warning">PENDING</Badge>;
      case "accepted":
        return <Badge style={{ fontSize: "1.2rem" }} color="primary">ACCEPTED</Badge>;
      case "canceled":
        return <Badge style={{ fontSize: "1.2rem" }} color="danger">CANCELED</Badge>;
      case "complete":
        return <Badge style={{ fontSize: "1.2rem" }} color="success">COMPLETE</Badge>;
      case "expired":
        return <Badge style={{ fontSize: "1.2rem" }} color="danger">EXPIRED</Badge>;
      default:
        return;
    }
  };
  const isTabletOrMobile = useMediaQuery({ maxWidth: 960 });
  const {
    cateringType,
    date,
    dateCreated,
    time,
    address: { formatted_address },
    items,
    _id,
    notes,
    total: { options, taxes, total, subtotal, serviceCharge }
  } = order.selectedOrder;
  const { firstName, lastName, email } = auth;

  const styles = {
    textFont: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    backStyle: {
      display: "flex",
      fontSize: "1.5rem",
      fontWeight: "bold",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "10px",
      backgroundColor: isTabletOrMobile ? "#ff7f7f" : hover ? "#ff7f7f" : "white"
    },
    titleStyle: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: isTabletOrMobile ? "column" : "row",
      padding: "10px"
    },
    tableHeaderStyle: {
      backgroundColor: "#a2d9e2"
    }
  };

  return (
    <div>

      <div
        style={styles.backStyle}
        onMouseEnter={() => { setHover(true) }}
        onMouseLeave={() => { setHover(false) }}
        onClick={() => { dispatch(selectedOrder()) }}
      >
        <MdArrowBack /> BACK
        </div>
      <Container>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => { window.print(); }} style={{ margin: "10px" }} size="sm" color="info" className="btn btn-sm btn-secondary mr-1 float-right"><i className="fa fa-print"></i> Print Invoice</Button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <h1 style={{ marginRight: "10px" }}>Order Invoice </h1><span>{renderStatus()}</span>

        </div>
        <div style={styles.titleStyle}>
          <h2 style={{ marginRight: "10px" }}>
            <strong>Order Confirmation #:</strong>
          </h2>
          {isTabletOrMobile ? <h5>{_id}</h5> : <h3>{_id}</h3>}
        </div>
        <Row style={{ padding: "10px" }}>
          <Col>
            <h3>{jsUcfirst(cateringType)} address:</h3>
            <div>{formatted_address}</div>
          </Col>
          <Col>
            <h3>Customer Infomation:</h3>
            <div>{firstName + " " + lastName}</div>
            <div>{email}</div>
          </Col>
          <Col>
            <h3>Notes:</h3>
            <div>{notes}</div>
          </Col>
        </Row>

        <h3 style={{ padding: "10px" }}>Catering Info:</h3>
        <Table striped bordered hover>
          <thead style={styles.tableHeaderStyle}>
            <tr>
              <th>Date Placed</th>
              <th>Catering Type</th>
              <th>Catering Time</th>
              <th>Catering Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{getDate(dateCreated)}</td>
              <td>{cateringType}</td>
              <td>{formatAMPM(time)}</td>
              <td>{getDate(date)}</td>
            </tr>
          </tbody>
        </Table>
        <h3 style={{ padding: "10px" }}>Menu</h3>
        <Table striped bordered hover>
          <thead style={styles.tableHeaderStyle}>
            <tr>
              <th>Amount</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {_.map(
              items,
              ({ amount, menuItem: { itemName, price } }, index) => {
                return (
                  <tr key={index}>
                    <td>{amount}</td>
                    <td>{itemName}</td>
                    <td>{formatMoney(price)}</td>
                    <td>{formatMoney(amount * price)}</td>
                  </tr>
                );
              }
            )}
            <tr>
              <td colSpan="4"></td>
            </tr>
            <tr>
              <td
                colSpan="4"
                style={{ fontWeight: "bold", ...styles.tableHeaderStyle }}
              >
                Total
              </td>
            </tr>
            <tr>
              <td colSpan="3" style={{ fontWeight: "bold" }}>
                Subtotal
              </td>
              <td>{formatMoney(subtotal)}</td>
            </tr>
            {_.map(options, ({ option, amount }, index) => {
              return (
                <tr key={index}>
                  <td colSpan="3" style={{ fontWeight: "bold" }}>
                    {jsUcfirst(option)}
                  </td>
                  <td>{formatMoney(subtotal * amount)}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan="3" style={{ fontWeight: "bold" }}>
                Ser. Chrg 18.0%
              </td>
              <td>{formatMoney(serviceCharge)}</td>
            </tr>
            <tr>
              <td colSpan="3" style={{ fontWeight: "bold" }}>
                Taxes
              </td>
              <td>{formatMoney(taxes)}</td>
            </tr>
            <tr>
              <td colSpan="3" style={{ fontWeight: "bold" }}>
                Total
              </td>
              <td>{formatMoney(total)}</td>
            </tr>
          </tbody>
        </Table>
        <br />
      </Container>
    </div>
  );
}


export default OrderDetail;