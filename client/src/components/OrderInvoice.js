import _ from 'lodash';
import React from 'react';
import { useDispatch } from "react-redux";
import { Card, CardHeader, CardBody, Row, Col, Table, Button } from 'reactstrap';
import { formalDate, formatMoney, jsUcfirst } from '../utils';
import { selectedOrder } from '../actions';

const OrderInvoice = (props) => {
  const dispatch = useDispatch();
  const clearSelectedOrder = () => {
    dispatch(selectedOrder(null));
  }

  const { _user: { email, firstName, lastName }, _id, date, notes, items, total: { subtotal, total, taxes, delivery, options, serviceCharge }, cateringType, address: { formatted_address } } = props.order;
  return <div className="animated fadeIn">
    <Card>
      <CardHeader>
        Invoice <strong>#{_id}</strong>
        <Button onClick={() => { clearSelectedOrder() }} className="btn btn-sm btn-danger mr-1 float-right"><i className="fa fa-arrow-right"></i> Back</Button>
        <Button onClick={() => { window.print(); }} className="btn btn-sm btn-secondary mr-1 float-right"><i className="fa fa-print"></i> Print</Button>
        {/* <a className="btn btn-sm btn-info mr-1 float-right"><i className="fa fa-save"></i> Save</a> */}
      </CardHeader>
      <CardBody>
        <Row className="mb-4">
          <Col sm="4">
            <h6 className="mb-3">From:</h6>
            <div><strong>Saboree Catering</strong></div>
            <div>12630 Perris Blvd.</div>
            <div>Moreno Valley, CA 92553</div>
            <div>Email: info@saboreecatering.com</div>
            <div>Phone: +1 951 924 2500</div>
          </Col>
          <Col sm="4">
            <h6 className="mb-3">To:</h6>
            <div><strong>{email}</strong></div>
            <div>{firstName} {lastName}</div>
            {cateringType === "Delivery" && <div>{formatted_address}</div>}
            {/* <div>43-190 Mikolow, Poland</div> */}
            <div>Email: {email}</div>
            {/* <div>Phone: +48 123 456 789</div> */}
          </Col>
          <Col sm="4">
            <h6 className="mb-3">Details:</h6>
            <div>Invoice <strong>#{_id}</strong></div>
            <div>{formalDate(date)}</div>
            <div>Catering Type: <strong>{cateringType}</strong></div>
            <div>Account Name: info@saboreecatering.com</div>
            {/* <div><strong>SWIFT code: 99 8888 7777 6666 5555</strong></div> */}
          </Col>
        </Row>
        <Table striped responsive>
          <thead>
            <tr>
              <th className="center">#</th>
              <th>Item</th>
              <th>Description</th>
              <th className="center">Quantity</th>
              <th className="right">Unit Cost</th>
              <th className="right">Total</th>
            </tr>
          </thead>
          <tbody>
            {_.map(items, ({ amount, menuItem: { itemName, price, description } }, index) => {
              return <tr key={index}>
                <td className="center">{index + 1}</td>
                <td className="left">{itemName}</td>
                <td className="left">{description}</td>
                <td className="center">{amount}</td>
                <td className="right">{formatMoney(price)}</td>
                <td className="right">{formatMoney(price * amount)}</td>
              </tr>
            })}
          </tbody>
        </Table>
        <Row>
          <Col lg="4" sm="5">
            <h3>Order Notes:</h3>
            {notes}
              </Col>
          <Col lg="4" sm="5" className="ml-auto">
            <Table className="table-clear">
              <tbody>
                <tr>
                  <td className="left"><strong>Subtotal</strong></td>
                  <td className="right">{formatMoney(subtotal)}</td>
                </tr>
                <tr>
                  <td className="left"><strong>Ser. Chrg 18.0%</strong></td>
                  <td className="right">{formatMoney(serviceCharge)}</td>
                </tr>
                {cateringType === "Delivery" && <tr>
                  <td className="left"><strong>Delivery Cost</strong></td>
                  <td className="right">{formatMoney(delivery)}</td>
                </tr>}
                {_.map(options, ({ option, total }) => {
                  return <tr>
                    <td className="left"><strong>{jsUcfirst(option)}</strong></td>
                    <td className="right">{formatMoney(total)}</td>
                  </tr>
                })}
                <tr>
                  <td className="left"><strong>Tax</strong></td>
                  <td className="right">{formatMoney(taxes)}</td>
                </tr>
                <tr>
                  <td className="left"><strong>Total</strong></td>
                  <td className="right"><strong>{formatMoney(total)}</strong></td>
                </tr>
              </tbody>
            </Table>
            {/* <a href="#" className="btn btn-success"><i className="fa fa-usd"></i> Proceed to Payment</a> */}
          </Col>
        </Row>
      </CardBody>
    </Card>
  </div>
}

export default OrderInvoice;